# Iris Valley Website

This is a multi-page website for Iris Valley, a nonprofit dedicated to empowering underprivileged kids.

## Pages
- **Home (`index.html`)**: The main landing page for Iris Valley.
- **Gallery (`gallery.html`)**: A collection of photos from Iris Valley's activities.
- **Events (`events.html`)**: Information about upcoming events.
- **Donate (`donate.html`)**: Page for making donations to support the cause.
- **Contact (`contact.html`)**: Form to get in touch with Iris Valley.

## Features
- **Clean Sans-Serif UI**: Features a light white and dark grey design with a modern, clean sans-serif font.
- **Integrated Logo**: The 'Iris Valley' text in the navigation bar has been replaced with the provided logo image, now larger for better visibility.
- **Responsive Design**: Built with Tailwind CSS for a modern and mobile-friendly layout, including a responsive navigation menu for smaller screens.
- **Consistent Navigation**: All pages include a navigation bar and footer with the `™` symbol only in the footer copyright.
- **Interactive Overlay**: A clickable circular image overlay in the bottom-left corner, linking to `dhruv.ftp.sh`. This functionality is embedded directly within each HTML file, not in a separate JavaScript file.
- **Stripe Donation Integration (Client-Side Placeholder)**: The donate page (`donate.html`) now includes a form for users to enter a custom donation amount. It integrates Stripe.js on the client-side. **However, please note that a fully functional and secure Stripe Checkout session (especially for dynamic amounts) requires a backend server to create the session with your secret API key.** The current implementation provides the client-side form and JavaScript structure, with clear instructions on where a backend API call would be necessary.
- **Favicon**: The website logo is now used as the favicon for all pages.

## How to View
1.  **Save Files**: Save all the provided files into a single directory.
2.  **Open in Browser**: Open any of the `.html` files (e.g., `index.html`) directly in your web browser.

## Stripe Integration Setup (Requires Backend)
To make the donation page fully functional, you will need a backend server to:
1.  **Create a `.env` file**: Place your `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` in a `.env` file in your *backend* project directory.
2.  **Server-Side Endpoint**: Implement a server-side endpoint (e.g., `/create-checkout-session`) that:
    *   Receives the donation `amount` from the client.
    *   Uses your `STRIPE_SECRET_KEY` to call the Stripe API and create a `checkout.Session`.
    *   Returns the `sessionId` to the client.
3.  **Client-Side Update**: In `donate.html`, replace the placeholder `sessionId` with the one received from your backend and ensure the `fetch` call is uncommented and points to your actual backend endpoint.

## Deployment with Vercel
This site can be deployed with Vercel. The `vercel.json` file is included with a rewrite configuration. Please note that `{"source": "/(.*)", "destination": "/index.html"}` is a common pattern for Single Page Applications (SPAs). In a Multi-Page Application (MPA) like this one, it might redirect all non-explicitly-matched paths to `index.html`, potentially affecting direct access to other pages if not navigated internally. Ensure this configuration aligns with your desired routing behavior.

## Copyright
&copy; 2025 Iris Valley&trade;. All rights reserved.