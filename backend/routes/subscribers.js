// routes for the email subscribers
// using express router

const express = require('express');
const Subscriber = require('../models/subscriberModel');

const router = express.Router();

// get all subscribers
router.get('/', (req, res) => {
    res.json({msg: 'GET all subscribers'});
});

// get a single subscriber
router.get('/:id', (req, res) => {
    res.json({msg: 'GET a single subscriber'});
});

// post a new subscriber
router.post('/', async (req, res) => {
    //get request body
    const {name, email, latitude, longitude} = req.body;
    try{
        // create new subscriber (asyncronous)
        const subscriber = await Subscriber.create(
            {name, email, latitude, longitude})
            // respond with the created object
            res.status(200).json(subscriber)
    }catch (error){
        // respond with error
        res.status(400).json({error: error.message})
    }
});

// delete a subscriber
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a subscriber'});
});

// update a subscriber
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE a subscriber'});
});

module.exports = router;