# VisionX Marketing — Portfolio v2
> Next.js 14 · TypeScript · Dark Editorial Luxury Theme · Custom Cursor

---

## 🖼 IMAGE PLACEMENT — Do This First

Place all 3 images inside the `/public/` folder:

| Your Original File      | Rename To          | Where It's Used                        |
|-------------------------|--------------------|----------------------------------------|
| `2.png`                 | `logo-white.png`   | Navbar · About section · Footer        |
| `New_Visionx_logo.png`  | `logo-dark.png`    | Reserved (future light-bg use)         |
| `imagefinal.png`        | `harsh-photo.jpg`  | Hero section — full right column photo |

```
visionx-v2/
└── public/
    ├── logo-white.png    ← from 2.png
    ├── logo-dark.png     ← from New_Visionx_logo.png
    └── harsh-photo.jpg   ← from imagefinal.png
```

> The photo fills the entire right half of the hero. It is bottom-aligned (feet/body grounded), fading to dark at the top. No badge overlay.

---

## 📁 Full Project Structure

```
visionx-v2/
├── app/
│   ├── globals.css       ← All CSS (tokens, cursor, every section)
│   ├── layout.tsx        ← Root layout + SEO metadata
│   └── page.tsx          ← Entire single-page site
├── public/
│   ├── logo-white.png    ← ADD THIS
│   ├── logo-dark.png     ← ADD THIS
│   └── harsh-photo.jpg   ← ADD THIS
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Local Development

```bash
# Install dependencies
npm install


# Production build
npm run build
npm start
```

---

## 🌐 Deploy to Vercel (Free, Recommended)

1. Push this folder to a new GitHub repository
2. Visit https://vercel.com → **Add New Project** → Import your repo
3. Vercel auto-detects Next.js — click **Deploy**
4. Go to **Settings → Domains** → add `marketingvisionx.com`
5. Update DNS at your registrar with Vercel's nameservers

---

## ✏️ Common Customisations

### Add a new project (in `page.tsx`):
Find the `PROJECTS` array and add:
```ts
{
  emoji: "🎨",
  bg: "linear-gradient(135deg,#0a0a10 0%,#10101a 100%)",
  accent: "#6366f1",
  cat: "Industry · Service Type",
  name: "Client Name",
  desc: "Short description of the work done.",
  url: "https://clientsite.com",
},
```

### Wire up the contact form:
In `page.tsx`, find the `submit` function and replace the `setTimeout` with a real API call.
Recommended: [Formspree](https://formspree.io) (free, no backend needed).

```ts
const submit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormState("sending");
  await fetch("https://formspree.io/f/YOUR_ID", {
    method: "POST",
    body: new FormData(e.target as HTMLFormElement),
    headers: { Accept: "application/json" },
  });
  setFormState("sent");
};
```

---

## 🎨 Design System

### Colour Tokens (`globals.css`)
```
--ink:   #0C0C0C   Page background (deep charcoal)
--ink2:  #141414   Card / section backgrounds
--cream: #F0EBE1   Primary text (warm off-white)
--red:   #E8001D   Brand accent (signal red)
```

### Typography
| Role     | Font                | Usage                  |
|----------|---------------------|------------------------|
| Display  | Cormorant Garamond  | All headings (h1, h2)  |
| UI       | Syne                | Body, nav, buttons     |
| Mono     | JetBrains Mono      | Labels, eyebrows, tags |

---

## 🖱 Custom Cursor
- Small red dot + ring that scales on hover
- **Desktop only** (≥ 1024px) — automatically hidden on phones/tablets
- Native cursor restored on mobile

---

## ✅ Go-Live Checklist

- [ ] 3 images renamed and placed in `public/`
- [ ] `npm run build` completes with no errors
- [ ] Tested on mobile (photo alignment, responsive grid)
- [ ] Tested on desktop (cursor, ticker, sticky nav)
- [ ] Contact form wired to Formspree or similar
- [ ] Custom domain added in Vercel

---

*VisionX Marketing · Harsh Patel · Anand, Gujarat, India*
# visionx_protfolio
