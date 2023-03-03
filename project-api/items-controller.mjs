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

// Sends a POST request to TSM API to get an auth token with the
// token in the .env file
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

// Calls Blizzard's Web API to get the item name and icon with itemID
async function getItemNameIcon(itemID) {
    // Blizzard's Classic API is down, so retail is needed for now
    // let item = await client.wow.classic.getItemById(itemID);
    let item = await client.wow.retail.getItemById(itemID);

    // handle the situation where Blizzard's API is down
    if (item == null) {
        const name = "Placeholder Name (Thanks, Blizzard)";
        const icon = "https://wow.zamimg.com/images/wow/icons/large/trade_engineering.jpg";
        return([name, icon]);
    }
    const icon = await item.getIcon();
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

// Sends POST request to TSM API with the given itemID and auctionHouseID
async function getItemData(itemID, auctionHouseID) {
    const authToken = await checkAuthToken();
    
    const apiURL = `https://pricing-api.tradeskillmaster.com/ah/${auctionHouseID}/item/${itemID}`
    
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

// adds item to DB. Returns true if passed, false if not.
const addItem = (req, item, itemData, iconStr) => {
    const result = new Promise(function(resolve, reject) {
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
        .then(_ => {
            resolve(item);
        })
        .catch(error => {
            console.log(error);
            reject(error);
    });           
    })
    return result;
}

function checkCreateJSON(req, res) {
    if (req.body.itemID === '') {
        res.status(400).json({ Error: "Please enter an item ID."});
        return;
    }  
    else if (req.body.quantity === '') {
        res.status(400).json({ Error: "Please enter a quantity."})
        return;
    }
    return true;
}

// BIG function to add item to list
app.post ('/items', async function (req, res) { 
    if (checkCreateJSON(req, res) == undefined) {
        console.log('JSON failed.')
        return;
    }
    const auctionHouseID = getAuctionHouseID(req.body.faction, req.body.realm);
    if (auctionHouseID == undefined) {
        res.status(400).json({ Error: "Please enter a valid realm or faction."});
        return;
    }
    const itemData = await getItemData(req.body.itemID, auctionHouseID);

    // get item data for icon src and item name
    const item = await getItemNameIcon(req.body.itemID);
    const iconStr = `${item[1]}`

    if (itemData == undefined || itemData.status === 404) {
        res.status(404).json({   Error: "Item doesn't exist." });
    }
    else {
        // add item to db and check if it worked
        addItem(req, item, itemData, iconStr)
        .then(result => {
            res.status(201).json(item);
        })
        .catch(error => {
            res.status(404).json( {Error: "Item missing information."});
        })
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

function checkDifferentSingle(params) {
    // params are item, currentPrice, and quantity in that order
    const item = params[0];
    const currentPrice = params[1];
    const quantity = params[2];
    const update = {};

    // check if parameters are different
    if (quantity !== item.quantity) {
        update.quantity = quantity;
    }
    if (currentPrice !== item.currentPrice) {
        update.currentPrice = currentPrice;
    }
    if (currentPrice !== item.currentPrice || quantity !== item.quantity) {
        update.total = quantity * currentPrice;
    }
    return update;
}

function checkDifferentAll(params) {
    // params are item, newData.minBuyout, and newData.marketValue in that order
    const item = params[0];
    const minBuyout = params[1];
    const marketValue = params[2];
    const update = {};

    if (item.currentPrice !== minBuyout) {
        update.currentPrice = minBuyout;
    }
    if (item.marketPrice !== marketValue) {
        update.marketPrice = marketValue;
    }
    if (item.currentPrice !== minBuyout || item.marketPrice !== marketValue) {
        update.total = minBuyout * item.quantity;
    }
    return update;
}

function checkUpdateJSON(req, res) {
    if (req.body.quantity === undefined) {
        res.status(400).json({ Error: "Missing parameters for update"});
        return false;
    }
    else if (req.body.quantity <= 0) {
        res.status(400).json({ Error: "Please enter a positive quantity."});
        return false;
    }
    if (req.body.currentPrice === undefined) {
        res.status(400).json({ Error: "Missing parameters for update"});
        return false;
    }
    else if (req.body.currentPrice < 0) {
        res.status(400).json({ Error: 'Please enter a non-negative price.'});
        return false;
    }
    else {
        return true;
    }
}

// calls updateItem function to update item's price
// resolves/rejects if successful/not successful.
function updatePrice( filter, update) {
    let result = new Promise(function(resolve, reject) {
        items.updateItem(filter, update)
            .then(modifiedCount =>{
                if (modifiedCount !== 1) {
                    reject("Could not update");
                }
                else {
                    resolve("Success");
                }
            })
    })
    return result;
}

// UPDATE documents controller ************************************
// UPDATE not REPLACE
app.put('/items/:_id', (req, res) => {
    // check if valid json
    if (checkUpdateJSON(req, res) == false) {
        return;
    }
    items.findById(req.params._id)
    .then(async item => {
        if (item !== null) {
            const updateParams = [item, req.body.currentPrice, req.body.quantity]
            const update = checkDifferentSingle(updateParams);
            if (JSON.stringify(update) !== '{}') {
                if (await updatePrice( {_id: req.params._id }, update) === "Success") {
                    res.status(200).json()
                }
                else {
                    res.status(404).json({ Error: "Item was not found (Update)" });
                    return;
                }
            }
            else { // Since update had nothing to update, just keep as is and say successful
                res.status(200).json();
            }                        
        }
        else {
            res.status(404).json({ Error: "Item was not found (findByID)"})
        }
    })
});

// checks if item exists in database and if request has valid updates
async function checkItemAndUpdates(item, req) {
    let result = new Promise(function(resolve, reject) {
        items.findById(item._id)
        .then(async documents =>{
            const auctionHouseID = getAuctionHouseID(req.body.faction, item.realm);
            let newData = await getItemData(item.itemID, auctionHouseID);
            if (newData == undefined || newData.statusCode === 404) {
                reject("TSM API retrieved nothing");
            }
            const updateParams = [item, newData.minBuyout, newData.marketValue];
            const update = checkDifferentAll(updateParams);
            resolve(update);
        })
        .catch(_ => reject("Item was not found in DB"));
    });
    return result;    
}

// UPDATE ALL
app.post('/update-all', async function (req, res) {
    let pass = true;
    let list = req.body;
    let length = Object.keys(list).length;
    for (let i=0; i < length; i++) {
        const item = list[i];
        let update = await checkItemAndUpdates(item, req)
            .catch(error => {
                pass = false;
                console.log(`Did not update ${i} because of findById or TSM API returned nothing.`);
                console.log(error);
            });
        console.log(update);
        if (JSON.stringify(update) === '{}') {
            // nothing to update, so skip this item
            continue;
        }
        if (await updatePrice( {_id: item._id}, update) !== "Success" ) {
            // could not update item due to missing item or DB error
            pass = false;
            console.log(`Did not update ${i} because of update function could not update item`);
        }
    }
    if (pass === true) {
        res.status(200).json();
    }
    else {
        res.status(400).json({ Error: "Not all item prices can be updated."})
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});