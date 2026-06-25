# Portfolio Website — Progress Document

## Status: ✅ Initial Build Complete

**Last Updated:** 2026-06-18  
**Stack:** React (CRA), Vanilla CSS, Jura (Google Fonts), Devicons CDN

---

## Completed

### ✅ Project Setup
- [x] Created React app via `create-react-app` at `portfolio-website/`
- [x] Removed boilerplate (App.css cleared, index.css rewritten)
- [x] Added Jura Google Font in `public/index.html`
- [x] Updated SEO meta tags (title, description, OG tags)
- [x] Copied hero background image to `public/hero_bg.png`

### ✅ Global Styles (`src/index.css`)
- [x] CSS variables: `--bg`, `--accent`, `--text`, `--font`
- [x] Global reset, scroll-behavior, custom scrollbar
- [x] `.section-title` utility class (bold, `#A06B3B`)

### ✅ Navbar (`Navbar.jsx` / `Navbar.css`)
- [x] Transparent + white text at top of page
- [x] Smooth transition to floating glassmorphism island on scroll (>80px)
  - Shrinks width to `860px`, `border-radius: 50px`
  - `backdrop-filter: blur(20px)` + accent border
- [x] GitHub and LinkedIn icon links
- [x] Smooth scroll to each section on nav click

### ✅ Hero Section (`Hero.jsx` / `Hero.css`)
- [x] Full-viewport parallax (`height: 140%`, `translateY(scrollY * 0.3)`)
- [x] Dark gradient overlay
- [x] Large name + role in `#A06B3B`
- [x] "Discover More" CTA button → scrolls to About
- [x] Animated scroll indicator line

### ✅ About Section (`About.jsx` / `About.css`)
- [x] Three bio paragraphs, justified text, `#4A4A4A`
- [x] Dark panel with subtle dot-grid pattern
- [x] Education cards (3-column grid): level in `#A06B3B`, degree in white, institution muted

### ✅ Technologies Section (`Technologies.jsx` / `Technologies.css`)
- [x] Dark panel with dot-grid background
- [x] Three groups: Frontend, Backend & Languages, Tools & Platforms
- [x] Devicons from `cdn.jsdelivr.net/gh/devicons/devicon`
- [x] Hover: lift + accent border glow

### ✅ Projects Section (`Projects.jsx` / `Projects.css`)
- [x] Horizontal draggable carousel (mouse + touch)
- [x] CSS `scroll-snap-type: x mandatory` — nearest card snaps
- [x] Cards: `#4A4A4A` BG, image (16:9), description, tech stack in `#A06B3B`
- [x] "Project Details" button → opens modal
- [x] Progress dots below — sync to active card, clickable

### ✅ Project Modal (`ProjectModal.jsx` / `ProjectModal.css`)
- [x] Smooth fade-in + scale-up on open
- [x] Smooth fade-out + scale-down on close
- [x] Click outside or press Escape to close
- [x] Rotating × close button with accent hover
- [x] Project image (16:9), title, tech stack, full description
- [x] "Live Site" (primary accent button) + "GitHub Repo" (ghost button)
- [x] Body scroll locked while modal open

### ✅ Certifications Section (`Certifications.jsx` / `Certifications.css`)
- [x] Dark panel with dot-grid pattern (matches Technologies)
- [x] 3-column grid of certification cards
- [x] Card: icon, cert name (uppercase white), issuer (muted), "Show Credential →" in accent
- [x] Hover: lift + accent border glow

### ✅ Contact Section (`Contact.jsx` / `Contact.css`)
- [x] Two-column layout: info + social links / contact form
- [x] Form fields with accent focus ring
- [x] Submit → opens native email client via `mailto:`
- [x] Footer with copyright

### ✅ Documentation
- [x] `CONTEXT.md` — design system, file structure, personalisation guide
- [x] `PROGRESS.md` (this file)

---

## Pending / To Do

### 🔲 Personalisation (User action required)
- [ ] Replace `YOUR NAME` in `Hero.jsx` with real name
- [ ] Replace `A.S` in `Navbar.jsx` with real initials
- [ ] Update GitHub / LinkedIn URLs in `Navbar.jsx` and `Contact.jsx`
- [ ] Update bio paragraphs in `About.jsx`
- [ ] Update education data in `About.jsx`
- [ ] Update tech stack in `Technologies.jsx`
- [ ] Replace placeholder projects in `Projects.jsx` with real projects
- [ ] Replace placeholder certs in `Certifications.jsx` with real ones
- [ ] Update `mailto:your@email.com` in `Contact.jsx`
- [ ] Update `<title>Your Name | Portfolio</title>` in `public/index.html`

### 🔲 Optional Enhancements
- [ ] Add scroll-triggered fade-in animations (IntersectionObserver) for sections
- [ ] Add a resume / CV download button in the Hero or About section
- [ ] Add a custom 404 page
- [ ] Deploy to Vercel / Netlify / GitHub Pages

---

## How to Run
```bash
cd C:\Users\Acer\.gemini\antigravity-ide\scratch\portfolio-website
npm start
```
Opens at **http://localhost:3000**
