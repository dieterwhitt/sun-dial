// dieter whittingham
// file for controlling the different request functions

const Subscriber = require('../models/subscriberModel');
const mongoose = require('mongoose');

// get all subscribers
const getSubscribers = async (req, res) => {
    // get all subscribers ordered by newest first
    const subscribers = await Subscriber.find({}).sort({createdAt : -1});
    // send back subscribers
    res.status(200).json(subscribers);
}

// get a single subscriber
const getSubscriber = async (req, res) =>{
    // getting the id from the route parameter
    const { id } = req.params;
    // making sure the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'invalid subscriber id'});
    }
    const subscriber = await Subscriber.findById(id);
    // checking for error
    if (!subscriber){
        return res.status(404).json({error: 'subscriber not found'})
    }else{
        // send back subscriber
        res.status(200).json(subscriber);
    }
    
}

// post a new subscriber
const createSubscriber = async (req, res) => {
    // get request body
    const {name, email, latitude, longitude} = req.body;
    // add to db
    try{
        // create new subscriber (asyncronous)
        const subscriber = await Subscriber.create(
            {name, email, latitude, longitude});
            // respond with the created object
            res.status(200).json(subscriber);
    }catch (error){
        // respond with error
        res.status(400).json({error: error.message});
    }
}

// delete a subscriber
const deleteSubscriber = async (req, res) => {
    const { id } = req.params;
    // make sure the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'invalid subscriber id'});
    }
    // deletes a subscriber with the particular id
    const subscriber = await Subscriber.findOneAndDelete({_id: id});
    // subscriber wasn't found (null)
    if (!subscriber){
        return res.status(404).json({error: 'subscriber not found'});
    }else{
        // deleted
        res.status(200).json(subscriber);
    }
}

// update a subscriber
const updateSubscriber = async (req, res) => {
    const { id } = req.params;
    // making sure valid id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'invalid subscriber id'});
    }
    // find a subscriber with a matching id and update its fields
    const subscriber = await Subscriber.findByIdAndUpdate({_id:id}, {
        // spread the json body - fields with new values
        ...req.body
    });
    // error checking again
    if (!subscriber){
        return res.status(400).json({error: 'subscriber not found'});
    }else{
        // deleted
        res.status(200).json(subscriber);
    }
}

module.exports = {
    createSubscriber,
    getSubscribers,
    getSubscriber,
    deleteSubscriber,
    updateSubscriber
};