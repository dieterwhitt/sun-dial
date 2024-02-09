// dieter whittingham
// feb 9 2024
// sun-dial backend
// setting up the backend for the app
// using express and node

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const subscriberRoutes = require('./routes/subscribers');

// express app
const app = express();

// middleware
// checks request body
app.use(express.json());
// must invoke next to comlete request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
// gets the subscriber routes after the path '/api/subscribers'
app.use('/api/subscribers', subscriberRoutes);

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // connected to db
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log('listening on port',process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    });


