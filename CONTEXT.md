# Portfolio Website — Context Document

## Project Overview
A personal portfolio website for a Computer Science (Data Analytics) student and web developer.
Built with **React** (Create React App). Single-page application with smooth scroll navigation.

---

## Design System

| Token | Value |
|---|---|
| Background | `#ECECEA` |
| Accent / Brand | `#A06B3B` |
| Body Text | `#4A4A4A` |
| Dark Panel BG | `#0d0d0d → #111111` (gradient) |
| Project Card BG | `#4A4A4A` |
| Font Family | **Jura** (Google Fonts) — weights 300/400/500/600/700 |

---

## Site Structure

| Section | Component | Route / ID |
|---|---|---|
| Hero / Landing | `Hero.jsx` | `#hero` |
| About Me | `About.jsx` | `#about` |
| Technologies | `Technologies.jsx` | `#technologies` |
| Projects | `Projects.jsx` | `#projects` |
| Certifications | `Certifications.jsx` | `#certifications` |
| Contact | `Contact.jsx` | `#contact` |

---

## Navbar Behaviour
- **At top (hero):** Fully transparent, full-width, white text.
- **On scroll (>80px):** Shrinks into a centered floating "island" with:
  - `backdrop-filter: blur(20px)` glassmorphism
  - `border-radius: 50px`
  - Width capped at `860px`
  - Subtle accent-colored border
  - Text switches to `#4A4A4A`

---

## Hero Section
- Full-viewport parallax background image (`/hero_bg.png`).
- Parallax logic: `translateY(scrollY * 0.3)` on the `<img>` element.
- Dark gradient overlay (`rgba(0,0,0,0.35 → 0.7)`).
- Large bold name in white, role in `#A06B3B`.

---

## About Section
- Three bio paragraphs, `text-align: justify`.
- Education cards inside a dark panel (`#1a1a1a`) with subtle dot-grid background.
- Education card accent label in `#A06B3B`, degree in white, institution in muted white.

---

## Technologies Section
- Dark panel with dot-grid pattern.
- Three groups: **Frontend**, **Backend & Languages**, **Tools & Platforms**.
- Icons sourced from `cdn.jsdelivr.net/gh/devicons/devicon`.
- Cards lift on hover with accent border glow.

---

## Projects Section
- Horizontal draggable carousel with **CSS scroll-snap**.
- Cards: `#4A4A4A` background, image top, description + tech stack (in `#A06B3B`).
- "Project Details" button opens `<ProjectModal>` with smooth fade+scale animation.
- Modal: dark (`#1e1e1e`), image, full details, Live Site + GitHub links.
- Progress dots below carousel snap to active card.

---

## Certifications Section
- Dark panel (same as Technologies).
- 3-column grid of cards.
- Each card: icon, certification name (uppercase white), issuer (muted), "Show Credential →" link in `#A06B3B`.

---

## Contact Section
- Two-column layout: info/socials on left, form on right.
- Form uses `mailto:` to open native email client.
- Accent-styled labels, focus ring in `#A06B3B`.
- Submit button in `#A06B3B`.

---

## File Structure

```
portfolio-website/
├── public/
│   ├── index.html          ← SEO meta, Jura font link
│   └── hero_bg.png         ← Parallax hero image
└── src/
    ├── index.css           ← Global resets, CSS variables, base styles
    ├── index.js            ← React entry point
    ├── App.js              ← Root component, assembles all sections
    ├── App.css             ← (intentionally blank)
    └── components/
        ├── Navbar.jsx / .css
        ├── Hero.jsx / .css
        ├── About.jsx / .css
        ├── Technologies.jsx / .css
        ├── Projects.jsx / .css
        ├── ProjectModal.jsx / .css
        ├── Certifications.jsx / .css
        └── Contact.jsx / .css
```

---

## Key Data to Personalise
Update the following placeholder values across the components:

| File | Placeholder | What to replace with |
|---|---|---|
| `Hero.jsx` | `YOUR NAME` | Your actual name |
| `Navbar.jsx` | `A.S` | Your initials |
| `Navbar.jsx` | GitHub / LinkedIn `href` | Your actual profile URLs |
| `About.jsx` | Bio paragraphs | Your personal bio |
| `About.jsx` | Education array | Your real education history |
| `Technologies.jsx` | `techGroups` array | Your actual tech stack |
| `Projects.jsx` | `projectsData` array | Your real projects |
| `Certifications.jsx` | `certifications` array | Your real certificates |
| `Contact.jsx` | `mailto:your@email.com` | Your email address |
| `public/index.html` | `Your Name` | Your actual name |

---

## Running Locally
```bash
cd portfolio-website
npm start
```
Runs on `http://localhost:3000`
