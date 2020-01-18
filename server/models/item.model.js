// get dependencies
const mongoose = require('mongoose'); // call mongoose

// items schema
var itemSchema = new mongoose.Schema({
    auctionId: {
        type: String,
        required: 'Auction id can\'t be empty'
    },
    itemCode: {
        type: String,
        require: 'Item code can\'t be empty',
        unique: true
    },
    itemName: {
        type: String,
        required: 'Item name can\'t be empty'
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        require: 'Price can\'t be empty'
    },
    quantity: {
        type: Number,
        require: 'Quantity can\'t be empty or lesser than 1',
        min: 1,
    },
    winner: {
        type: String
    }
});

// create Inventory model schema
module.exports = mongoose.model('Item', itemSchema);