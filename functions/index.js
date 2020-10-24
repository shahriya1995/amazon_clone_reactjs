const functions = require('firebase-functions');
const express = require("express");

const cors = require("cors");
const stripe = require("stripe")('sk_test_tRp2wh6HjpKumodDlQyw6KYJ00eG052xPY');

//API

//API CONFIG
const app = express();
//Middleware

app.use(cors({origin:true}));
app.use(express.json());

//app routes
app.get('/',(request,response) => response.status(200).send('Hello world'))

app.post('/payments/create', async (request,response)=>{
    const total = request.query.total;

    console.log('Payment recieved for amount',total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:"usd",
    });

    response.status(201).send({
        clientSecret:paymentIntent.client_secret,

    })
})

//listen commandd
exports.api = functions.https.onRequest(app)
