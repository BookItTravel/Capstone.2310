/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_ID);
const router = require('./api/router');

const {
  PORT = 3000,
  JWT_SECRET = 'placeholder secret',
  DEPLOYED_URL = 'https://travelapp-3da1f049e629.herokuapp.com'
} = process.env;

// Apply JSON parsing middleware
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Logging middleware
app.use(morgan('dev'));
app.use(cors());

// Check requests for a token and attach the decoded id to the request
app.use((req, _res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch {
    req.user = null;
  }
  next();
});

// Apply stripe checkout session for a cart checkout
app.post('/create-checkout-session', async (req, res) => {

  const { amount } = req.body;
  const cart = [
    {
      price_data: {
        currency: 'usd',
        unit_amount: amount,
        product_data: {
          name: 'Package Total',
          description: 'Total package value after savings',
        },
      },
      quantity: 1,
    },

  ];

  
  const session = await stripe.checkout.sessions.create({
    success_url: `${DEPLOYED_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${DEPLOYED_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    line_items: cart,
    mode: 'payment',
    // eslint-disable-next-line max-len
    // TODO: metadata passed with success_url. Can set metadata to cancel or success = true to show if the transaction was successful or canceled.
    // return_url: `${DEPLOYED_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ url: session.url });
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});


// app.get('/confirmation', (req, res) =>{
//   res.redirect('/confirmation')
// })
// Apply router
app.use('/', router);
app.use('/users', require('./api/users'));
app.use('/cart', require('./api/cart'));
app.use('/orders', require('./api/orders'));

const client = require('./db/index');

client.connect();

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res
    .sendStatus(err.status || 500)
    .send(err.message || 'Internal server error.');
});

// app.use('*', (_req, res) => {
//   res.status(404).send('Not found.');
// });

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend/dist', 'index.html'))
})

// Serving app on defined PORT
app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT);
});
