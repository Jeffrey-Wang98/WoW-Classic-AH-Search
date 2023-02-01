// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect to the Atlas cluster or local MongoDB.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected 
// and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Items collection using Mongoose.');
    }
});


// Define the collection's schema.
const itemSchema = mongoose.Schema({
	name: { 
        type: String, 
        required: true
    },
	itemID: { 
        type: Number, 
        required: true
    },
    realm: {
        type: String,
        required: true
    },
    faction: {
        type: String,
        required: true
    },
	currentPrice: { 
        type: Number, 
        required: true, 
        min: 0
    },
    marketPrice: { 
        type: Number, 
        required: true,
        min: 0
    },
    time: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        default: 1
    },
    icon: {
        type: String
    },
    total: {
        type: Number,
        required: true
    }
});

// Compile the model from the schema.
const Item = mongoose.model("Item", itemSchema);



// CREATE model *****************************************
const createItem = async ( name, itemID, realm, faction, currentPrice, marketPrice, time, quantity, icon, total ) => {
    const item = new Item({ 
        name: name, 
        itemID: itemID, 
        realm: realm,
        faction: faction,
        currentPrice: currentPrice,
        marketPrice: marketPrice,
        time: time,
        quantity: quantity,
        icon: icon,
        total: total
    });
    return item.save();
}



// RETRIEVE models *****************************************

// Retrieve based on a filter and return a promise.
const findItems = async (filter) => {
    const query = Item.find(filter);
    return query.exec();
}

// Retrieve based on the ID and return a promise.
const findById = async (_id) => {
    const query = Item.findById(_id);
    return query.exec();
}



// DELETE models  *****************************************
// Delete based on the ID.
const deleteById = async (_id) => {
    const result = await Item.deleteOne({_id: _id});
    return result.deletedCount;
};

// Delete based on filter.
const deleteByProperty = async (filter) => {
    const result = await Item.deleteMany(filter);
    return result.deletedCount;
}



// UPDATE model *****************************************
const updateItem = async (filter, update) => {
    const result = await Item.updateOne(filter, update);
    return result.modifiedCount;
};

// REPLACE model *********************************************
const replaceItem = async ( _id, name, itemID, realm, faction, currentPrice, marketPrice, time, quantity, icon, total  ) => {
    const result = await Item.replaceOne({_id: _id }, {
        name: name, 
        itemID: itemID, 
        realm: realm,
        faction: faction,
        currentPrice: currentPrice,
        marketPrice: marketPrice,
        time: time,
        quantity: quantity,
        icon: icon,
        total: total
    });
    return result.modifiedCount;
}



// Export our variables for use in the controller file.
export { createItem, findItems, findById, updateItem, replaceItem, deleteById, deleteByProperty }