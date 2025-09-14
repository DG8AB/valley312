let stripeInstance = null; // Declare globally, initialize lazily
const STRIPE_SECRET_KEY = 'sk_test_51S73xJBIjmogVQSWxewwhXAvEB06V0DFphLqdsyK8tE1whEdEcS9Lfd9awgDSVdfbdfcDiOrSXMKgnHByYUZK3zU005n8uOSkX';

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed. Only POST requests are supported.' });
    }

    try {
        // Initialize Stripe instance only once per cold start
        if (!stripeInstance) {
            stripeInstance = require('stripe')(STRIPE_SECRET_KEY);
        }

        const { amount } = req.body;

        if (!amount || typeof amount !== 'number' || amount < 0.50) {
            return res.status(400).json({ message: 'Invalid amount provided. Amount must be a number and at least $0.50.' });
        }

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Donation to Iris Valley Non-profit',
                        },
                        unit_amount: Math.round(amount * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel.html`,
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Error in create-checkout-session:', error);
        res.status(500).json({ message: error.raw?.message || error.message || 'A server error occurred while creating the checkout session.' });
    }
};
