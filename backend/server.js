// dieter whittingham
// feb 9 2024
// sun-dial backend
// setting up the backend for the app
// using express and node

require('dotenv').config();

const express = require('express');
const subscriberRoutes = require('./routes/subscribers');

// express app
const app = express();

// middleware
// must invoke next to comlete request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', subscriberRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port',process.env.PORT);
})
