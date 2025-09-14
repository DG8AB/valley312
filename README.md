# Iris Valley&trade; Website

This is a multi-page website for Iris Valley&trade;, a nonprofit dedicated to empowering underprivileged kids.

## Pages
- **Home (`index.html`)**: not decided.
- **Gallery (`gallery.html`)**: not decided.
- **Events (`events.html`)**: not decided.
- **Donate (`donate.html`)**: not decided.
- **Contact (`contact.html`)**: not decided.

## Features
- **Clean Sans-Serif UI**: Features a light white and dark grey design with a modern, clean sans-serif font.
- **Integrated Logo**: The 'Iris Valley' text in the navigation bar has been replaced with the provided logo image, now larger for better visibility.
- **Responsive Design**: Built with Tailwind CSS for a modern and mobile-friendly layout, including a responsive navigation menu for smaller screens.
- **Consistent Navigation**: All pages include a navigation bar and footer.
- **Interactive Overlay**: A clickable circular image overlay in the bottom-left corner, linking to `dhruv.ftp.sh`. This functionality is embedded directly within each HTML file, not in a separate JavaScript file.

## How to View
1.  **Save Files**: Save all the provided files into a single directory.
2.  **Open in Browser**: Open any of the `.html` files (e.g., `index.html`) directly in your web browser.

## Deployment with Vercel
This site can be deployed with Vercel. The `vercel.json` file is included with a rewrite configuration. Please note that `{"source": "/(.*)", "destination": "/index.html"}` is a common pattern for Single Page Applications (SPAs). In a Multi-Page Application (MPA) like this one, it might redirect all non-explicitly-matched paths to `index.html`, potentially affecting direct access to other pages if not navigated internally. Ensure this configuration aligns with your desired routing behavior.

## Copyright
&copy; 2025 Iris Valley&trade;. All rights reserved.