# Netflix Clone

A front-end clone of the Netflix website built with plain HTML, CSS, and JavaScript. It includes a landing page with a working sign-in/sign-up flow and a browsable "streaming" page with movie rows.

## Features

- **Landing Page (`index.html`)**
  - Netflix-style hero section with background image and "Get Started" email field
  - Feature highlights section (TV, downloads, multi-device streaming, kids profiles)
  - FAQ accordion (expand/collapse questions)
  - Sign In / Sign Up modal with form validation
  - Language selector (English / Urdu)

- **Streaming Page (`streamzone.html`)**
  - Featured title banner with a "Play" button
  - Scrollable rows for Netflix Originals, Top Rated, Comedy, Romantic, and Action movies
  - Animated marquee banner

- **Browse Page (`browsearea.html`)**
  - Simplified browsing layout with poster rows for different categories

- **Authentication (demo only)**
  - Accounts are stored in the browser's `localStorage`
  - A demo account is seeded automatically: `demo@netflix.com` / `demo1234
  - Sign up creates a new local account; sign in validates against stored accounts
  - On success, the user is redirected to `streamzone.html`

## Project Structure

```
├── index.html          # Landing page
├── streamzone.html      # Main streaming/browse page
├── browsearea.html      # Alternate browse layout
├── src/
│   ├── styles.css        # Styles for index.html
│   └── index.js          # Sign-in/sign-up logic, FAQ accordion
├── streamzone.css        # Styles for streamzone.html
├── browsearea.css        # Styles for browsearea.html
└── img/                  # Images, posters, and video assets (not included)
```

## Getting Started

1. Clone or download this repository.
2. Make sure the `img/` folder with all poster/video assets is present alongside the HTML files.
3. Open `index.html` in your browser.
4. Click **Sign In**, then either:
   - Sign in with the demo account: `demo@netflix.com` / `demo1234`, or
   - Use "Sign up now" to create a new local account.
5. You'll be redirected to `streamzone.html` to browse the catalog.

## Tech Stack

- HTML5
- CSS3 (Flexbox, animations, media queries)
- Vanilla JavaScript (DOM manipulation, `localStorage`)
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts – Poppins](https://fonts.google.com/specimen/Poppins)

## Disclaimer

This project is for educational/practice purposes only. It is not affiliated with or endorsed by Netflix, and no real user data or payments are involved.
