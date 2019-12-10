// get dependencies
const express = require('express'); // call express
const auctionRouter = express.Router(); // get an instance of express router
const _ = require('lodash');

// get files
const Auction = require('../models/auction.model'); // get Auction schema

// routes for all auction routes
//================================================
// Create auction route
auctionRouter.post('/createAuction', (req, res, next) => {
    
    // get auction values from the request
    var newAuction = new Auction();
    newAuction.auctionName = req.body.auctionName;
    newAuction.organizer = req.body.organizer;
    newAuction.maxItems = req.body.maxItems;
    newAuction.address = req.body.address;
    newAuction.dateTime = req.body.dateTime;
    newAuction.fee = req.body.fee;

    // save the auction to the database
    newAuction.save((err, doc) => {
        if (!err){
            res.send(doc);
        }
        else {
            if (err.code == 11000){
                res.status(422).send(['Duplicate auction found.']);
            }
            else
                return next(err);
        }
    });
});

// Find auction routes
// Find all auctions route
auctionRouter.get('/findAllAuctions', (req, res) => {
    Auction.find((err, auctions) => {
        if (!err) {
            res.send(auctions);
        }
        else { 
            res.send(err);
        }
    });
});

// Find one auction route using req
auctionRouter.get('/findAuction', (req, res) => {
    Auction.findOne({ auctionName: req.body.auctionName },
        (err, auction) => {
            if (!auction)
                return res.status(404).json({ status: false, message: 'Auction record not found.' });
            else
                return res.status(200).json({ status: true, auction : _.pick(auction, ['auctionName', 'organizer']) });
        })
});

// Find one auction route using param
auctionRouter.get('/findAuction/:auctionName', (req, res) => {
    Auction.findOne({auctionName: req.params.auctionName},
        (err, auction) => {
        if (!err) { 
            res.send(auction);
        }
        else { res.send(err);}
    })
});

// Edit auction route
auctionRouter.get('/editAuction');

// Delete auction routes
// delete auction by id on the parameter
auctionRouter.delete('/deleteAuction/:id', (req, res) => {
    Auction.findByIdAndDelete(req.params.id, (err, auction) => {
        if (!err) { res.send(auction);}
        else { res.send(err);}
    })
});

// delete auction by name through json
auctionRouter.delete('/deleteAuction', (req, res) => {
    Auction.findOneAndDelete(req.body.auctionName, (err, auction) => {
        if (!err) { res.send(auction);}
        else { res.send(err);}
    })
});

// return the router
module.exports = auctionRouter;