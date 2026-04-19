# Michael Suh — Personal Portfolio & Professional Website

Live at **[michaelsuh.vercel.app](https://michaelsuh.vercel.app)**

A clean, modern developer portfolio and professional website built with React and Tailwind CSS. Designed to showcase my background, experience, and the products I'm building — with a contact form for direct outreach.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Contact form | EmailJS |
| Deployment | Vercel (auto-deploy on push to `main`) |

---

## Sections

- **Hero** — name, title, tagline, and CTAs
- **About** — bio, quick facts, and skills across four categories (Technical, AI & Emerging, Leadership, Domain)
- **Experience** — work history (Embross, OpenText, IBM), education (University of Waterloo), and awards
- **Projects** — live project cards with dynamic screenshots via Microlink; animated placeholder for upcoming projects
- **Contact** — EmailJS-powered contact form

---

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## Project cards & thumbnails

Project card thumbnails are fetched dynamically at runtime using the [Microlink API](https://microlink.io) — no manual screenshots to maintain. Results are cached in `localStorage` for 24 hours. Upcoming projects display an animated placeholder until they go live.

---

*Built by [Michael Suh](https://michaelsuh.vercel.app)*
