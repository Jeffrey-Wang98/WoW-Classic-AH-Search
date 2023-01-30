import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as items from './items-model.mjs';
import { Client }  from 'gadgetzan';
import fetch from 'node-fetch';

const client = new Client (
    process.env.BATTLE_NET_CLIENT_ID,
    process.env.BATTLE_NET_CLIENT_SECRET,
    {
        region: 'us',
        locale: 'en_US'
      }
);

const app = express();

// const client = new Client (
//    process.env.BATTLE_NET_CLIENT_ID,
//    process.env.BATTLE_NET_CLIENT_SECRET
// );

const PORT = process.env.PORT;
const tsmID = process.env.TSM_CLIENT_ID;

app.use(express.json());

// JSON auction house IDs
const auctionHouseList = {
    Atiesh: [279, 280],
    Myzrael: [281, 282],
    Old_Blanchy: [283, 284],
    Azuresong: [285, 286],
    Mankrik: [287, 288],
    Pagle: [289, 290],
    Ashkandi: [293, 294],
    Westfall: [295, 296],
    Whitemane: [297, 298],
    Faerlina: [311, 312],
    Grobbulus: [317, 318],
    Bloodsail_Buccaneers: [319, 320],
    Remulos: [321, 322],
    Arugal: [323, 324],
    Yojamba: [325, 326],
    Sulfuras: [343, 344],
    Windseeker: [345, 346],
    Benediction: [347, 348],
    Earthfury: [351, 352],
    Skyfury: [461, 462],
    Maladath: [463, 464],
    Eranikus: [471, 472],
    Angerforge: [473, 474]
};

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
    // console.log(tsmJSON);

    return fetch('https://auth.tradeskillmaster.com/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(tsmJSON)
    })
        .then(response => response.json())
        .then(result => {
            // console.log(result.access_token);
            return result;
        })
        .catch(error => console.log('error', error));
    
    // console.log(tsmAuth);
};

async function getItem(req, res) {
    let item = await client.wow.classic.getItemById(req.body.itemID);
    return(item);
};

async function getItemData(req, res, auctionHouseID) {
    let currentTime = Math.floor(new Date().getTime() / 1000);
    // console.log(`The time is ${currentTime}`);
    if (tsmAuthTokenStorage.access_token === '' || currentTime >=  tsmAuthTokenStorage.time_left){
        const authToken = await getAuthToken();
        tsmAuthTokenStorage.access_token = authToken.access_token;
        tsmAuthTokenStorage.time_left = currentTime + 86400;
    }
    const authToken = tsmAuthTokenStorage.access_token;
    // console.log(authToken);
    // console.log(tsmAuthTokenStorage);
    
    const apiURL = `https://pricing-api.tradeskillmaster.com/ah/${auctionHouseID}/item/${req.body.itemID}`
    // console.log(apiURL);

    try {
        return await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            redirect: 'follow'
        })
            .then(response => {
                // response.json();
                // console.log(response);   
                return(response.json());
            })
            .catch(error => console.log('error', error));
    }
    
    catch (error) {
    // console.log(error);
    res.status(400).json({ error: "Couldn't create document due to missing parameters." });  
    }
};


app.post ('/items', async function (req,res) { 
    // console.log(req.body);
    let auctionHouseID = 0;    
    try {
        if (req.body.faction === "Alliance") {
            // console.log(auctionHouseList[req.body.realm][0]);
            auctionHouseID = auctionHouseList[req.body.realm][0];
        }
        else {
            // console.log(auctionHouseList[req.body.realm][1]);
            auctionHouseID = auctionHouseList[req.body.realm][1];
        }
        try {
            const itemData = await getItemData(req, res, auctionHouseID);
            const item = await getItem(req, res);
            let icon = await item.getIcon();
            let iconStr = `${icon}`
            // console.log(iconStr);
            // console.log(itemData);
            
            if (itemData.status === 404) {
                res.status(404).json({ error: "Item doesn't exist." });
            }
            else {
                items.createItem(
                    item.name, 
                    req.body.itemID, 
                    req.body.realm,
                    req.body.faction,
                    itemData.minBuyout,
                    itemData.marketValue,
                    req.body.time,
                    1,
                    iconStr
                )
                .then(item => {
                    res.status(201).json(item);
                })
                .catch(error => {
                    // console.log(error);
                    res.status(404).json({ error: "Item doesn't exist." });
                });           
            }
             
        }
        catch(error){
            res.status(404).json({ error: "Item doesn't exist." });
        }
    }
    catch(error) {
        res.status(400).json({ error: "Please enter a Realm and Faction please." });
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
    }
    else if (req.body.quantity <= 0) {
        res.status(400).json({ Error: "Please enter a positive quantity."});
    }
    if (req.body.currentPrice === undefined) {
        res.status(400).json({ Error: "Missing parameters for update"});
    }
    else if (req.body.currentPrice < 0) {
        res.status(400).json({ Error: 'Please enter a non-negative price.'});
    }
    else {
        // console.log(req.body.quantity);
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
                                        quantity: req.body.quantity
                                    })
                                } else {
                                    res.status(404).json({ Error: "Item was not found (Update)" });
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
                            quantity: req.body.quantity
                        })
                    }                        
                }
                else {
                    res.status(404).json({ Error: "Item was not found (findByID)"})
                }

            })
    }
    
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});