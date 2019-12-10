// get dependencies
const express = require('express'); // call express
const itemRouter = express.Router(); // get an instance of express router

// get files
const Auction = require('../models/auction.model'); // get Auction schema
const Item = require('../models/item.model'); // get Item schema

// routes for all item routes
//==========================================
// Add item route
itemRouter.post('/addItem', (req, res) => {
    
    // Get item values from the request
    var item = new Item();
    item.auctionName = req.body.auctionName
    item.itemCode = req.body.itemCode;
    item.itemName = req.body.itemName;
    item.description = req.body.description;
    item.price = req.body.price;
    item.quantity = req.body.quantity;
    item.winnder = req.body.winner;

    // Find the auction to add the item
    Auction.findOne({ auctionName: item.auctionName }, (err, auction) => {
        
        // If auction is found
        if (auction) {
            console.log(auction);

            // If quantity of the item is more than the max items allow
            if (item.quantity > auction.maxItems){
                res.write('Quantity is more than max items allow');
            }
            // Save the item to the database
            else { 
                item.save((err, item) => {
                    if (!err){
                        res.send(item);
                    }
                    else {
                        res.send(err);
                    }
                })
            }
        }
        // Display when no auction is found
        else console.log('No auction found');
    });
});

// Find item routes
// Find all items route
itemRouter.get('/findAllItem', (req, res) => {
    Item.find((err, item) => {
        if (!err) res.send(item);
        else res.send(err);
    });
});

// Find item by name route
itemRouter.get('/findItem', (req, res) => {
    Item.find({ itemName: req.body.itemName }, 
        (err, item) => {
            if (item) {
                res.send(item);
            }
            else {
                res.send('No item found');
            }
        });
});

// Edit item route
itemRouter.get('/editItem');

// Delete item routes
// Delete item by id on the params
itemRouter.delete('/deleteItem/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id, (err, item) => {
        if (!err) { res.send(item);}
        else { res.send(err);}
    });
});

// return the router
module.exports = itemRouter;