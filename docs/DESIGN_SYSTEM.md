# VOLT229 — Design System — $10k finish

## Brand Identity

**Nom:** VOLT229 — 229 indicatif Bénin + Volt énergie terrain.
**Logo:** Éclair monogramme qui se prolonge en semelle, formant V. Trait unique, angles nets. Version icône 32x32 (favicon) + horizontale avec logotype.

```
Icon: [⚡+sole]
Horizontal: [icon] VOLT229 — VOLT in #F5F5F0, 229 in #C6FF3D
```

## Tokens

### Colors
```ts
--volt-black: #0D0D0F // fond dominant, 80% UI
--volt-lime: #C6FF3D // accent signature, CTA, highlights — use sparingly 10%
--volt-red: #E63946 // secondaire, promo, error — 5%
--volt-cloud: #F5F5F0 // texte principal, cartes claires
--volt-slate: #8A8F98 // texte discret, meta
```

Usage:
- Background: #0D0D0F
- Card: #121214 / #0F0F11 border white/[0.06]
- CTA primary: bg-[#C6FF3D] text-black + shadow [0_0_30px_rgba(198,255,61,0.3)]
- CTA secondary: bg-[#E63946] text-white
- Text: #F5F5F0 primary, #8A8F98 secondary
- Borders: white/10 default, white/20 hover, #C6FF3D/30 active

### Typography
- Display: Bebas Neue (400) — all headings, prices, badges, uppercase tracking. Fallback: Anton, Impact.
  - H1: 48-112px, line-height 0.85, letter-spacing -0.02em
  - H2: 32-72px, 0.9
  - H3: 18-28px
  - Badge: 10-13px, tracking 0.15-0.2em uppercase
- Body: Manrope (400-700) — paragraphs, UI. Fallback: Inter, system-ui.
  - Body: 13.5-16px, leading relaxed
  - Meta: 11-12px tracking wide uppercase

### Spacing & Layout
- Max width: 1600px centered, px 20 mobile, 32 desktop
- Grid: 12 cols, gap 20
- Card radius: 2-4px (sharp, not rounded — premium streetwear), except chatbot 16px, color pills 999px
- Section padding: py-16 to py-24
- Border: 1px solid white/10

### Effects
- Grain: SVG turbulence 0.04 opacity overlay
- Vignette: radial transparent → #0D0D0F 80%
- Shine: translateX -100% → 100% on hover, via white/20 gradient, 700ms ease-out
- Blur: backdrop-blur-xl for navbar, chatbot header
- Shadows: lime glow 0_0_30px_rgba(198,255,61,0.3) on CTA hover 50px

## Components

### Navbar
- Fixed 64px, backdrop-blur-xl bg #0D0D0F/70 border-b white/6
- Logo left, nav center (desktop) with active indicator motion layoutId, cart + user right
- Mobile: hamburger → full-screen menu with large display links 28px

### ProductCard — Core banger
- Container: bg #121214 border white/6 overflow-hidden, hover border lime/30
- Image area aspect 4/3 bg #0D0D0F, radial lime glow on hover
- Fake 3D shoe: CSS crafted with rotate -12deg skewX -8deg, sole shadow blur, lime slash, brand micro-label 10px tracking 0.3em white/30
- Badges top-left: Nouveau lime black, promo red white 10px display
- Colors dots top-right 12px
- Info p-4: name display 15px, category 11px uppercase slate, price display 16px, old line-through
- Sizes: 28x24 bg white/4 border white/6 10px
- Hover: parallax rotateX/Y via motion values (8deg max), shine sweep 1200ms cubic-bezier(0.16,1,0.3,1)

### ProductViewer3D
- Canvas dpr [1,2], PerspectiveCamera 38deg fov, ambient 0.7 + directional 1.3 + point lime
- Shoe model: primitive box/capsule/sphere for mobile perf (no GLB), Float, OrbitControls enablePan false, autoRotate
- UI: top-left badge 360° drag, bottom color switcher pills with motion layoutId ring
- Mobile fallback: if WebGL unavailable → show CSS shoe with drag rotation via framer-motion

### Button
- Base: inline-flex center font-display uppercase tracking-widest ease [0.16,1,0.3,1]
- Variants: primary lime black + glow, secondary red white, ghost transparent border white/10, outline border lime text lime
- Sizes: sm h-9 px-4 13px, md h-12 px-7 14px, lg h-14 px-10 16px
- Micro: whileTap scale 0.97, shine sweep translateX

### Chatbot
- Floating bubble 56px bottom-5 right-5 bg lime black shadow 0_8px_30px_rgba(198,255,61,0.4) + red dot pulse
- Window: 380px max, 520px h, bg #121214 border white/10 rounded 16px shadow 0_20px_80px rgba(0,0,0,0.6)
- Header 56px bg #0D0D0F border-b white/10, icon sparkles lime
- Messages: user lime black rounded-br 4px, assistant white/6 border white/10 rounded-bl 4px, 13.5px
- Quick prompts: pills white/5 border white/10 11px scroll-x no-scrollbar
- Input: h-11 rounded-full bg white/6 border white/10 focus lime/50

### Marquee
- h-36px bg lime black, display 15px tracking 0.15em uppercase, motion x 0→-50% linear 20s infinite, 6 copies

## Animations — Exigence centrale

- GSAP ScrollTrigger: from y 40 opacity 0 rotateX 5 → y0 opacity1 duration 1.1 power4.out start top 88%
- Product cascade: index * 0.06 delay
- Hero: y 20→0 opacity stagger 0.1, 0.3, 0.4
- PageTransition: AnimatePresence mode wait, initial opacity0 y8 → opacity1 y0 exit y-8 duration 0.45 ease [0.16,1,0.3,1]
- 3D: useFrame rotation y sin(t*0.3)*0.3, position y sin(t*0.5)*0.15
- Hover 360: OrbitControls drag, or autoRotate 0.8 speed
- Micro: framer-motion whileTap, hover scale, layoutId for active nav, color ring

## Mobile Performance (Bénin constraint)

- Three.js dynamic import ssr false, dpr capped 1.5 mobile, antialias true alpha true
- No heavy GLB, use primitives (box, capsule, sphere) <50KB JS
- Images: WebP, <150KB, lazy, placeholder blur
- GSAP only on client, ScrollTrigger toggleActions play none none reverse
- Tailwind: purge, no external fonts blocking (display swap)
- Chatbot: only renders when open? Actually floating button always, window AnimatePresence mounts on open
- Marquee: CSS transform only (GPU)
- Cart: localStorage, no server roundtrip until checkout

## Pages structure recap

1. Accueil: Marquee + Hero 2-col + Why 3-col + Featured 3-col + Video light section + Carousel new drops + Testimonials
2. Catalogue: Sidebar filters (brand, usage, size, price range) sticky top 88px, grid 3-col, AnimatePresence layout
3. Produit: Breadcrumb 11px uppercase slate, 2-col viewer sticky info, color switcher, size grid 4-col, qty + add, similar 3-col
4. Panier: 2-col items + checkout, delivery fee by city, payment methods 2-col grid, phone input conditional
5. Vidéos: Player 16/9 + playlist scroll, tags lime, scanlines overlay
6. À propos: Manifesto large display, stats, team cards, contact form sticky, lime CTA
7. Auth: Split left form 420px max, right visual bg cloud black with radial lime, benefits

This system delivers $10k finish: sharp borders, lime glow, display type, parallax 3D CSS, GSAP reveals, no generic template.
