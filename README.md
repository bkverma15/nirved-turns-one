# Nirved's First Birthday Countdown

A beautiful, mobile-first birthday countdown website for Nirved.

## How to replace photos
1. Create a folder named `assets` in the root directory, and inside it, create an `images` folder (i.e. `assets/images/`).
2. Add your photos to the `assets/images/` folder.
3. Name them `photo1.jpg`, `photo2.jpg`, etc., to match the placeholder names in `index.html`.
4. If you use different names, simply open `index.html` and update the `src` attribute of the `<img>` tags in the Gallery section.

## How to replace music
1. Create a `music` folder inside `assets` (i.e. `assets/music/`).
2. Add your music track and rename it to `birthday.mp3`.
3. If using a different file name or format (like `.wav`), update the `<source>` tag under the `<audio id="bg-music">` element in `index.html`.

## How to change WhatsApp number
1. Open `index.html`.
2. Scroll to the Invitation Section.
3. Search for the WhatsApp link: `https://wa.me/91XXXXXXXXXX`.
4. Replace `91XXXXXXXXXX` with your actual country code and phone number (e.g. `919876543210`).

## How to change venue
1. Open `index.html`.
2. Scroll to the Invitation Section and find the `<div class="event-details">`.
3. Replace the `Add venue here` text with the real venue address.
4. To link the location, update the "Get Location" button's `href="#"` attribute with a real Google Maps link.

## How to deploy
This website is built with static files (HTML, CSS, JS) and can be hosted for free quickly.

**Using Netlify / Vercel:**
1. Create a GitHub repository and push these files to it.
2. Log in to Netlify or Vercel and click "Add New Site".
3. Import your GitHub repository.
4. Click Deploy (no build settings required).

**Using GitHub Pages:**
1. Create a new public GitHub repository.
2. Upload these files to the `main` branch.
3. Go to Repository Settings > Pages.
4. Select the `main` branch as the source and click Save.
5. Your site will be live at `https://yourusername.github.io/repositoryname`.
