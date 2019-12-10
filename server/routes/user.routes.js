// get dependencies
const express = require('express'); // call express
const userRouter = express.Router(); // get an instance of express router
const passport = require('passport'); // call passport
const _ = require('lodash'); // call lodash

// get files
const User = require('../models/user.model'); // get User schema
const jwt = require('../config/jwt');

// routes for all user routes
//================================================
// Register route
userRouter.post('/register', (req, res, next) => {
    var newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.save((err, doc) => {
        if (!err)
            res.send(doc);
        else
        {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email address found.']);
            else
                return next(err);
        }
    });
});


// Authenticate
userRouter.post('/authenticate', (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        
        // error from passport middleware
        if (err)
            return res.status(400).json(err);
        // registered user
        else if (user)
            return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else
        return res.status(404).json(info);
    })
    (req, res)
});

// Dashboard
userRouter.get('/dashboard', jwt.verifyJwtToken, (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['firstName', 'lastName', 'email']) });
        });
});

// return the router
module.exports = userRouter;