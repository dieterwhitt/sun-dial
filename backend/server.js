// dieter whittingham
// feb 9 2024
// sun-dial backend
// setting up the backend for the app
// using express and node

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const subscriberRoutes = require('./routes/subscribers');

const nodeMailer = require('nodemailer');

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

const message = `
    <h1>hello from nodemailer!</h1>
`;
const recipient = '';

async function send(){
    // send email
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        }
    });

    const info = await transporter.sendMail({
        from: 'sundial <>',
        to: recipient,
        subject: 'Daily Sundial Update',
        html: message,
    })
    // log info
    console.log("message sent: " + info.messageId);
}

//send()
//catch error
//.catch(e => console.log(e));