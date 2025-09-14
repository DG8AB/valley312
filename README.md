# Iris Valley Website

This is a multi-page website for Iris Valley, a nonprofit dedicated to empowering underprivileged individuals and communities.

## Pages
- **Home (`index.html`)**: The main landing page for Iris Valley, now including upcoming events.
- **Gallery (`gallery.html`)**: A collection of photos from Iris Valley's activities. Now states "No photos yet."
- **Events (`events.html`)**: Information about future events and announcements (main events moved to homepage).
- **Donate (`donate.html`)**: Page for making donations to support the cause, now integrated with a conceptual backend API for Stripe Checkout.
- **Contact (`contact.html`)**: Form to get in touch with Iris Valley.

## Features
- **Clean Sans-Serif UI**: Features a light white and dark grey design with a modern, clean sans-serif font.
- **Integrated Logo**: The 'Iris Valley' text in the navigation bar has been replaced with the provided logo image, now larger for better visibility.
- **Responsive Design**: Built with Tailwind CSS for a modern and mobile-friendly layout, including a responsive navigation menu for smaller screens.
- **Consistent Navigation**: All pages include a navigation bar and footer with the `™` symbol only in the footer copyright.
- **Interactive Overlay**: A clickable circular image overlay in the bottom-left corner, linking to `dhruv.ftp.sh`. This functionality is embedded directly within each HTML file, not in a separate JavaScript file.
- **Stripe Donation Integration (Client-Side & Serverless Backend)**: The donate page (`donate.html`) now includes a form for users to enter a custom donation amount. It integrates Stripe.js on the client-side and communicates with a conceptual backend API endpoint (`/api/create-checkout-session`) to create a Stripe Checkout session. A placeholder Node.js file (`api/create-checkout-session.js`) is provided as an example of how the server-side logic is implemented, now with enhanced error checking for missing API keys.
- **Favicon**: The website logo is now used as the favicon for all pages.
- **Inclusive Language**: All instances of "child bias" have been removed.
- **"What We Do" Section Update**: The "What We Do" section on the homepage is now a wide bar stating "Not Decided."
- **Gallery Update**: The gallery page now explicitly says "No photos yet."

## How to Make the Donation Page Work (Stripe Integration)

To get the donation page fully functional, you need to configure your Stripe API keys and deploy the backend logic.

### 1. Obtain Your Stripe API Keys

Go to your [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) (in test mode for development, then switch to live mode). You will need:
-   **Publishable Key**: Starts with `pk_test_...` or `pk_live_...`. This key is used in your client-side `donate.html`.
-   **Secret Key**: Starts with `sk_test_...` or `sk_live_...`. This key **must be kept secret** and only used on your backend server.

### 2. Configure Environment Variables

#### A. For Local Development (`.env` file)

Create a `.env` file in the root of your project (where `api/create-checkout-session.js` is also accessible relative to your project root) with your actual Stripe keys:

```dotenv
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY
```

*   **Note**: The `api/create-checkout-session.js` will read `STRIPE_SECRET_KEY` from this file when run locally. The serverless function now includes a clear error message if this key is missing or is the placeholder value.

#### B. For Vercel Deployment (Vercel Project Settings)

When deploying to Vercel, you must set these as [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) in your Vercel project settings:

1.  Go to your Vercel project dashboard.
2.  Navigate to **Settings** -> **Environment Variables**.
3.  Add two new variables:
    *   `STRIPE_SECRET_KEY`: Set its value to your actual Stripe Secret Key (`sk_live_...` or `sk_test_...`).
    *   `STRIPE_PUBLISHABLE_KEY`: Set its value to your actual Stripe Publishable Key (`pk_live_...` or `pk_test_...`).
    
    Ensure these are configured for the correct environments (e.g., Development, Preview, Production).
    The serverless function (`api/create-checkout-session.js`) will now return a `500` error with a specific message if `STRIPE_SECRET_KEY` is not correctly configured in your Vercel environment.

### 3. **CRITICAL: Update `donate.html` (Client-Side)**

Open `donate.html` and locate the JavaScript section. You will find a placeholder for the Stripe Publishable Key:

```javascript
const STRIPE_PUBLISHABLE_KEY_PLACEHOLDER = 'pk_test_YOUR_PUBLISHABLE_KEY';
const stripePublishableKey = STRIPE_PUBLISHABLE_KEY_PLACEHOLDER; // REPLACE THIS LINE with your actual key, e.g., 'pk_test_12345...' 
```

**You MUST manually replace** `'pk_test_YOUR_PUBLISHABLE_KEY'` in the line `const stripePublishableKey = STRIPE_PUBLISHABLE_KEY_PLACEHOLDER;` with your actual Stripe **Publishable Key** (e.g., `'pk_test_your_actual_publishable_key_here'`). For example:

```javascript
const stripePublishableKey = 'pk_test_51Om...'; // Your actual key
```

This key is publicly visible, so it's safe to include directly in your client-side JavaScript for a static site. The client-side script now includes a console error and an alert if the placeholder is still present, preventing the donation form from submitting.

### 4. Deploy the Backend (Vercel Serverless Function)

The `api/create-checkout-session.js` file is designed to run as a [Vercel Serverless Function](https://vercel.com/docs/concepts/functions/serverless-functions). The `vercel.json` file is already configured to route requests to `/api/create-checkout-session` to this file.

To make this backend functional:

1.  **Ensure `package.json` and Dependencies**: The `api/create-checkout-session.js` uses `express`, `stripe`, and `dotenv`. Make sure your `package.json` includes these dependencies and run `npm install` locally before deploying.
    *   If you don't have a `package.json` in your project root, create one (`npm init -y`) and then add these dependencies (`npm install express stripe dotenv`).
    *   Vercel will automatically detect and install these dependencies during deployment if `package.json` is present.

2.  **Deploy to Vercel**: Once your `donate.html` is updated with your publishable key and your environment variables are set in Vercel, deploy your project. Vercel will automatically deploy `api/create-checkout-session.js` as a serverless function that can access `STRIPE_SECRET_KEY` from your Vercel environment variables.

### 5. Test the Donation Flow

After deployment and configuration:

1.  Navigate to your `donate.html` page.
2.  Enter a donation amount (minimum $5).
3.  Click "Donate Now".
4.  You should be redirected to a Stripe Checkout page.
5.  Complete the payment (using [Stripe test card numbers](https://stripe.com/docs/testing)).
6.  Upon successful payment, you should be redirected to `success.html`.
7.  If cancelled, you should be redirected to `cancel.html`.