import 'dotenv/config';
import express from 'express';
import * as items from './items-model.mjs';
import { Client }  from 'gadgetzan';
import fetch from 'node-fetch';
import auctionHouseList from './auctionHouseList.json' assert { type: "json" };


const client = new Client (
    process.env.BATTLE_NET_CLIENT_ID,
    process.env.BATTLE_NET_CLIENT_SECRET,
    {
        region: 'us',
        locale: 'en_US'
      }
);

const app = express();

const PORT = process.env.PORT;
const tsmID = process.env.TSM_CLIENT_ID;

app.use(express.json());

var tsmAuthTokenStorage = {
    access_token: '',
    time_left: 0
}

// CREATE controller ******************************************
// via post

async function getAuthToken() {
    const tsmJSON = {
        client_id: "c260f00d-1071-409a-992f-dda2e5498536",
        grant_type: "api_token",
        scope: "app:realm-api app:pricing-api",
        token: tsmID
    }

    return fetch('https://auth.tradeskillmaster.com/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(tsmJSON)
    })
        .then(response => response.json())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
};

async function getItemNameIcon(itemID) {
    const item = await client.wow.classic.getItemById(itemID);

    // handle the situation where Blizzard's API is down
    if (item == null) {
        const name = "Placeholder Name (Thanks, Blizzard)";
        const icon = "https://wow.zamimg.com/images/wow/icons/large/trade_engineering.jpg";
        return([name, icon]);
    }
    const icon = item.getIcon();
    return([item.name, icon]);
};


// checks if there is a saved, non-expired auth token and returns the old or new auth token
async function checkAuthToken() {
    // get time to check how old auth token is
    let currentTime = Math.floor(new Date().getTime() / 1000);

    // if auth token expired, get a new one and save it with expiration timer
    // also get new auth token if there is no old token
    if (tsmAuthTokenStorage.access_token === '' || currentTime >=  tsmAuthTokenStorage.time_left){
        const authToken = await getAuthToken();
        tsmAuthTokenStorage.access_token = authToken.access_token;
        tsmAuthTokenStorage.time_left = currentTime + 86400;
    }
    const authToken = tsmAuthTokenStorage.access_token;
    return( authToken );
}

async function getItemData(itemID, auctionHouseID) {
    const authToken = await checkAuthToken();
    
    const apiURL = `https://pricing-api.tradeskillmaster.com/ah/${auctionHouseID}/item/${itemID}`
    
    try {
        return await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            redirect: 'follow'
        })
            .then(response => {
                return(response.json());
            })
            .catch(error => console.log('error', error));
    }
    
    catch (error) {
        // do nothing
        return;
    }
};

// assign auction house ID
function getAuctionHouseID(faction, realm) {
    // if no faction or no realm were given
    if (faction === "" || realm === "") {
        return;
    }
    if (faction === "Alliance") {
        return(auctionHouseList[realm][0]);
    }
    else {
        return(auctionHouseList[realm][1]);
    }
}

// BIG function to add item to list
app.post ('/items', async function (req, res) { 
    if (req.body.itemID === '') {
        res.status(400).json({ Error: "Please enter an item ID."});
        return;
    }  
    else if (req.body.quantity === '') {
        res.status(400).json({ Error: "Please enter a quantity."})
        return;
    }
    try {
        const auctionHouseID = getAuctionHouseID(req.body.faction, req.body.realm);
        if (auctionHouseID == undefined) {
            res.status(400).json({ Error: "Please enter a valid realm or faction."});
            return;
        }
        try {
            const itemData = await getItemData(req.body.itemID, auctionHouseID);
            console.log(itemData);

            // get item data for icon src and item name
            const item = await getItemNameIcon(req.body.itemID);
            let icon = item[1];
            let iconStr = `${icon}`

            if (itemData == undefined || itemData.status === 404) {
                res.status(404).json({   Error: "Item doesn't exist." });
            }
            else {
                items.createItem(
                    item[0], 
                    req.body.itemID, 
                    req.body.realm,
                    req.body.faction,
                    itemData.minBuyout,
                    itemData.marketValue,
                    req.body.time,
                    req.body.quantity,
                    iconStr,
                    itemData.minBuyout * req.body.quantity
                )
                .then(item => {
                    res.status(201).json(item);
                })
                .catch(error => {
                    console.log(error);
                    res.status(404).json({ Error: "Item doesn't exist." });
                });           
            }
             
        }
        catch(error){
            res.status(404).json({ Error: "Item doesn't exist." });
        }
    }
    catch(error) {
        res.status(400).json({ Error: "Please enter a Realm and Faction please." });
    }
    
});

// RETRIEVE ****************************************************
// GET ALL items
app.get('/items', (req, res) => {
    let filter = {};
    items.findItems(filter, '', 0)
        .then(items => {
            res.send(items);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Could not retrieve items' });
        });

});

// GET items by ID
app.get('/items/:_id', (req, res) => {
    const itemId = req.params._id;
    items.findById(itemId)
        .then(item => { 
            if (item !== null) {
                res.json(item);
            } else {
                res.status(404).json({ Error: 'Item was not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Could not retrieve item' });
        });

});



// DELETE Functions and Controller ******************************
// DELETE item by ID REST API
app.delete('/items/:_id', (req, res) => {
    items.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Item was not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Could not delete item' });
        });
});


// UPDATE documents controller ************************************
// UPDATE not REPLACE
app.put('/items/:_id', (req, res) => {
    // check if valid json
    if (req.body.quantity === undefined) {
        res.status(400).json({ Error: "Missing parameters for update"});
        return;
    }
    else if (req.body.quantity <= 0) {
        res.status(400).json({ Error: "Please enter a positive quantity."});
        return;
    }
    if (req.body.currentPrice === undefined) {
        res.status(400).json({ Error: "Missing parameters for update"});
        return;
    }
    else if (req.body.currentPrice < 0) {
        res.status(400).json({ Error: 'Please enter a non-negative price.'});
        return;
    }
    else {
        items.findById(req.params._id)
            .then(item => {
                if (item !== null) {
                    const update = {};

                    // check if parameters are different
                    if (req.body.quantity !== item.quantity) {
                        update.quantity = req.body.quantity;
                    }
                    if (req.body.currentPrice !== item.currentPrice) {
                        update.currentPrice = req.body.currentPrice;
                    }
                    if (req.body.currentPrice !== item.currentPrice || req.body.quantity !== item.quantity) {
                        update.total = req.body.quantity * req.body.currentPrice;
                    }
                    if (JSON.stringify(update) !== '{}') {
                        items.updateItem( { _id: req.params._id }, update )
                            .then(modifiedCount => {
                                if (modifiedCount === 1) {
                                    res.json({ 
                                        _id: req.params._id, 
                                        name: req.body.name, 
                                        itemID: req.body.itemID, 
                                        realm: req.body.realm,
                                        faction: req.body.faction,
                                        currentPrice: req.body.currentPrice,
                                        marketPrice: req.body.marketPrice,
                                        time: req.body.time,
                                        quantity: req.body.quantity,
                                        total: req.body.quantity * req.body.currentPrice
                                    })
                                } else {
                                    res.status(404).json({ Error: "Item was not found (Update)" });
                                    return;
                                }
                            })
                            .catch(error => {
                                console.error(error);
                                res.status(400).json({ Error: "Could not update item" });
                            });
                    }
                    else { // Since update had nothing to update, just keep as is and say successful
                        res.json({ 
                            _id: req.params._id, 
                            name: req.body.name, 
                            itemID: req.body.itemID, 
                            realm: req.body.realm,
                            faction: req.body.faction,
                            currentPrice: req.body.currentPrice,
                            marketPrice: req.body.marketPrice,
                            time: req.body.time,
                            quantity: req.body.quantity,
                            total: req.body.quantity * req.body.currentPrice
                        })
                    }                        
                }
                else {
                    res.status(404).json({ Error: "Item was not found (findByID)"})
                    return;
                }

            })
    }
    
});

// UPDATE ALL
app.post('/update-all', async function (req, res) {
    let pass = true;
    let list = req.body;
    let length = Object.keys(list).length;
    for (let i=0; i < length; i++) {
        const item = list[i];
        items.findById(item._id)
            .then(async document => {
                if (document !== null) {
                    const auctionHouseID = getAuctionHouseID(req.body.faction, item.realm)
                    let newData = await getItemData(item.itemID, auctionHouseID);
                    
                    if (newData == undefined) {
                        pass = false;
                    }

                    let update = {};

                    // check if update changes anything
                    if (item.currentPrice !== newData.minBuyout) {
                        update.currentPrice = newData.minBuyout;
                    }
                    if (item.marketPrice !== newData.marketValue) {
                        update.marketPrice = newData.marketValue;
                    }
                    if (item.currentPrice !== newData.minBuyout || item.marketPrice !== newData.marketValue) {
                        update.total = newData.minBuyout * item.quantity;
                    }
                    if (JSON.stringify(update) !== '{}') {
                        const documentID = item._id;
                        items.updateItem( { _id: documentID }, update )
                            .then(modifiedCount => {
                                if (modifiedCount === 1) {
                                    pass = true;
                                } else {
                                    pass = false;
                                    console.log(`Did not update ${i} because of updateItem`);
                                }
                            })
                            .catch(error => {
                                console.error(error);
                                pass = false;
                            });
                    }
                    
                }
                else{
                    pass = false;
                    console.log(`Did not update ${i} because of findById.`)
                }
            })
    }
    if (pass === true) {
        res.status(200).json()
    }
    else {
        res.status(400).json({ Error: "Not all item prices can be updated."})
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});