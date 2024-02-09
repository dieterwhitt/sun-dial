// routes for the email subscribers
// using express router

const express = require('express');
const router = express.Router();

// get all subscribers
router.get('/', (req, res) => {
    res.json({msg: 'GET all subscribers'});
});

// get a single subscriber
router.get('/:id', (res, req) => {
    res.json({msg: 'GET a single subscriber'});
});

// post a new subscriber
router.post('/', (req, res) => {
    res.json({msg: 'POST a new subscriber'});
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