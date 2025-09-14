# Iris Valley Website

This is a multi-page website for Iris Valley, a nonprofit dedicated to empowering underprivileged individuals and communities.

## Pages
- **Home (`index.html`)**: The main landing page for Iris Valley, now including upcoming events.
- **Gallery (`gallery.html`)**: A collection of photos from Iris Valley's activities. Now states "No photos yet."
- **Events (`events.html`)**: Information about future events and announcements. Now explicitly lists the "Open Mic Night at Jackie Sweets" event.
- **Donate (`donate.html`)**: Page for making donations to support the cause, now integrated with a conceptual backend API for Stripe Checkout.
- **Contact (`contact.html`)**: Form to get in touch with Iris Valley.

## Features
- **Clean Sans-Serif UI**: Features a light white and dark grey design with a modern, clean sans-serif font.
- **Integrated Logo**: The 'Iris Valley' text in the navigation bar has been replaced with the provided logo image, now larger for better visibility.
- **Responsive Design**: Built with Tailwind CSS for a modern and mobile-friendly layout, including a responsive navigation menu for smaller screens.
- **Consistent Navigation**: All pages include a navigation bar and footer with the `™` symbol only in the footer copyright.
- **Interactive Overlay**: A clickable circular image overlay in the bottom-left corner, linking to `dhruv.ftp.sh`. This functionality is embedded directly within each HTML file, not in a separate JavaScript file.
- **Stripe Donation Integration (Client-Side & Serverless Backend)**: The donate page (`donate.html`) now includes a form for users to enter a custom donation amount. It integrates Stripe.js on the client-side and communicates with a conceptual backend API endpoint (`/api/create-checkout-session`) to create a Stripe Checkout session. A Node.js file (`api/create-checkout-session.js`) is provided as an example of how the server-side logic is implemented, now with enhanced error checking, robust Stripe initialization, and proper JSON error responses. The current implementation correctly uses Stripe's hosted checkout page for payment processing.
- **Favicon**: The website logo is now used as the favicon for all pages.
- **Inclusive Language**: All instances of "child bias" have been removed.
- **"What We Do" Section Update**: The "What We Do" section on the homepage is now a wide bar stating "Not Decided."
- **Gallery Update**: The gallery page now explicitly says "No photos yet."
- **Homepage Events Update**: The homepage now features only one event: "Open Mic Night at Jackie Sweets." Clicking this event opens a Google Form in an iframe modal for sign-ups, with no fixed date yet. This event is also now displayed on the Events page.

## How to Make the Donation Page Work (Stripe Integration)

To get the donation page fully functional, you need to configure your Stripe API keys and deploy the backend logic.

### 1. Obtain Your Stripe API Keys

Go to your [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) (in test mode for development, then switch to live mode). You will need:
-   **Publishable Key**: Starts with `pk_test_...` or `pk_live_...`. This key is used in your client-side `donate.html`.
-   **Secret Key**: Starts with `sk_test_...` or `sk_live_...`. This key **must be kept secret** and only used on your backend server.

### 2. Configure API Keys Directly

#### A. Client-Side (`donate.html`)

The `donate.html` file has been updated with the provided `STRIPE_PUBLISHABLE_KEY` (`pk_test_51S73xJBIjmogVQSWAST7nt0NGPTGg0P5BZsr1JDSKqTYRT6X31dlb7wBvO2U2wJ8Eg7LcnhJAQ1FmoSdfpwFh0cg00dtjdJjqk`) directly in its JavaScript. This key is publicly visible and safe to include directly.

#### B. Server-Side (`api/create-checkout-session.js`)

The `STRIPE_SECRET_KEY` is now hardcoded directly into `api/create-checkout-session.js`. For production environments, it is strongly recommended to use environment variables for sensitive keys instead of hardcoding them.

### 3. Deploy the Backend (Vercel Serverless Function)

The `api/create-checkout-session.js` file is designed to run as a [Vercel Serverless Function](https://vercel.com/docs/concepts/functions/serverless-functions). The `vercel.json` file is already configured to route requests to `/api/create-checkout-session` to this file.

To make this backend functional:

1.  **Ensure `package.json` and Dependencies**: The `api/create-checkout-session.js` uses `stripe`. Your `package.json` now includes this dependency. Ensure you run `npm install` locally before deploying.

2.  **Deploy to Vercel**: Once your `donate.html` is updated with your publishable key and your backend (`api/create-checkout-session.js`) has the secret key, deploy your project. Vercel will automatically deploy `api/create-checkout-session.js` as a serverless function.

### 4. Test the Donation Flow

After deployment and configuration:

1.  Navigate to your `donate.html` page.
2.  Enter a donation amount (minimum $0.50 for Stripe test mode).
3.  Click "Donate Now".
4.  You should be redirected to a Stripe Checkout page.
5.  Complete the payment (using [Stripe test card numbers](https://stripe.com/docs/testing)).
6.  Upon successful payment, you should be redirected to `success.html`.
7.  If cancelled, you should be redirected to `cancel.html`.