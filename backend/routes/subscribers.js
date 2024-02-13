// routes for the email subscribers
// using express router

const express = require('express');
const {
    createSubscriber,
    getSubscribers,
    getSubscriber,
    deleteSubscriber,
    updateSubscriber
} = require('../controllers/subscriberController');

const router = express.Router();

// get all subscribers
router.get('/', getSubscribers);

// get a single subscriber
router.get('/:id', getSubscriber);

// post a new subscriber
router.post('/', createSubscriber)

// delete a subscriber
router.delete('/:id', deleteSubscriber);

// update a subscriber
router.patch('/:id', updateSubscriber);

module.exports = router;