// This file is a conceptual backend API endpoint for creating Stripe Checkout Sessions.
// It is written in Node.js using Express and the Stripe Node.js library.
// IMPORTANT: This file cannot be run directly as a static file from your website.
// On Vercel, this file will be deployed as a serverless function.

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

// Initialize Stripe with your secret key. This key must be kept secret and only used server-side.
// It will be loaded from process.env.STRIPE_SECRET_KEY, which comes from your .env file locally
// or Vercel environment variables when deployed.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json()); // Enable JSON body parsing for incoming requests

// Middleware to allow CORS for development purposes.
// In a production environment, you should restrict this to your specific frontend URL(s).
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Adjust this in production to your frontend URL(s)
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Define the API endpoint for creating a Stripe Checkout Session
// This endpoint should receive the donation amount from the client.
app.post('/api/create-checkout-session', async (req, res) => {
    const { amount } = req.body;

    // Basic validation for the donation amount
    // Stripe expects amount in cents, so $5.00 minimum means 500 cents.
    if (!amount || amount < 500 || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Invalid donation amount. Minimum is $5.00 (500 cents).' });
    }

    try {
        // Create a new Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Iris Valley Donation',
                            description: 'Support our mission to empower individuals and foster community growth.',
                        },
                        unit_amount: amount, // Amount in cents provided by client
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // These URLs will redirect the user after payment success or cancellation.
            // They should point back to your static HTML pages.
            success_url: `${req.headers.origin}/success.html`, 
            cancel_url: `${req.headers.origin}/cancel.html`,   
        });

        // Respond with the session ID to the client, which then redirects to Stripe Checkout
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

// This is how you would start your Node.js server to listen for requests locally.
// When deployed as a Vercel Serverless Function, Vercel handles the server listening.
const PORT = process.env.PORT || 3000;
// Only listen if not in a serverless environment (e.g., Vercel will set VERCEL_ENV)
if (!process.env.VERCEL_ENV) {
    app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
}

// To make this file runnable locally:
// 1. Ensure you have Node.js installed.
// 2. Create a `package.json` file in your project root (if you don't have one) and install dependencies:
//    `npm init -y`
//    `npm install express stripe dotenv`
// 3. Create a `.env` file in the project root with `STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY`.
// 4. Run the server locally: `node api/create-checkout-session.js` (or `nodemon` for auto-restarts).
