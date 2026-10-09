# Porsche 911 Turbo S Sadu Edition Portfolio 🏎️

A developer portfolio built with **React**, **Vite**, and **Modern CSS**, inspired by the bespoke aesthetic of the **Porsche 911 Turbo S Sadu Edition**.

## 🎨 Color Palette & Design Tokens
* **Base:** Charcoal Black (`#111113` - `#18181A`)
* **Primary Accent:** Desert Dune / Sand Titanium (`#BCA693`)
* **Performance Accent:** Carmine / Sadu Crimson (`#9E3E3E`)

---

## ⚡ Quick Setup for Launch

### 1. 🔑 Add Your Web3Forms Access Key
Open `src/components/ContactModal.jsx` and replace the placeholder near line 7:
```javascript
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY_HERE";
```
*(Messages sent from the Contact form will now land directly in your email inbox!)*

### 2. 📄 Add Your Resume PDF
Drop your resume into the `public/` directory named as:
```text
portfolio/public/resume.pdf
```
*(The navbar and contact modal will automatically open and download this file).*

### 3. 🔗 Add Your Social & Repo Links
- **GitHub & LinkedIn URLs:** Edit in `src/components/Navbar.jsx` & `src/components/Footer.jsx`.
- **Project Repos & Live Demos:** Edit the `projects` array in `src/components/ProjectsCarousel.jsx`.
- **Certificates:** Edit the `certifications` array in `src/components/Certifications.jsx`.

---

## 🛠️ How to Run Locally

```bash
cd "C:\Users\Acer\.gemini\antigravity-ide\scratch\portfolio"
npm install
npm run dev
```

Then visit `http://localhost:3000` in your browser.
