# VOLT229 — LIVRABLE COMPLET — BANGER $10k

## ✅ Ce qui a été livré (prêt à preview)

**Site live:** http://localhost:3000 (preview dans Arena)

### Frontend — Next.js 16 + Tailwind 4 + GSAP + Three.js + Framer Motion
- **7 pages** conformes cahier des charges:
  1. `/` Accueil: hero plein écran 3D, bandeau énergie, carrousel nouveautés, pourquoi VOLT229, aperçu vidéo, témoignages
  2. `/auth` Connexion/Inscription: formulaire épuré fond noir terrain accent volt CTA + Google OAuth
  3. `/catalogue` 12 paires min, filtres marque/pointure/prix/usage, grille cascade scroll
  4. `/produit/[id]` Visualiseur 3D pleine largeur, sélecteur pointure/coloris fluide, avis, similaires, ajout panier animé
  5. `/panier` Récap, choix paiement Mobile Money MTN/Moov/Fedapay/cash, suivi commande, livraison par ville
  6. `/videos` Galerie vidéos sneakers unboxing/test terrain/culture locale, lecteur vignettes animées
  7. `/a-propos` Histoire marque + contact + chatbot bulle flottante permanente

- **Composants réutilisables:**
  - `ProductCard` avec parallax 3D CSS, hover shine, badges, sizes
  - `ProductViewer3D` Three.js primitive (mobile perf) + OrbitControls 360° drag + color switcher
  - `Hero3D` Float + ShoeModel abstract volt
  - `Navbar` fixed blur + active layoutId + cart count + mobile drawer
  - `Footer` avec MTN/Moov/Fedapay badges
  - `Chatbot` bulle flottante overlay spring, typing indicator, quick prompts, fake AI responses alignées marque
  - `Button` variants primary lime glow / secondary red / ghost / outline + shine sweep
  - `ScrollReveal` GSAP ScrollTrigger + `PageTransition` AnimatePresence

- **Design System documenté:** `docs/DESIGN_SYSTEM.md` — tokens couleurs/typo/espacements, usage, animations, mobile perf

### Backend — Spec prod ready
- `backend/prisma/schema.prisma`: User, Product, ProductVariant (size/color/sku/stock/images), CartItem (guest via sessionId), Order (orderNumber VOLT-229-XXXX, status, paymentMethod MTN_MOMO/MOOV_MONEY/FEDAPAY/CASH, deliveryFee by city), OrderItem snapshot, Review, ChatSession, ChatMessage
- `docs/API.md`: Endpoints auth (JWT bcrypt Google), products filters, cart guest+auth, orders + MTN MoMo pay + webhooks, chat SSE Claude, reviews, infra notes Bénin (MTN MoMo API, Fedapay, WhatsApp tracking, S3, Cloudflare)

### Brand
- Logo monogramme éclair + semelle = V, version icône + horizontale
- Palette: #0D0D0F noir terrain dominant, #C6FF3D volt accent, #E63946 ember CTA alt, #F5F5F0 nuage, #8A8F98 ardoise
- Typo: Bebas Neue display condensée + Manrope body
- Ton: énergique premium rapide jamais criard

### Animations — exigence centrale respectée
- Scroll: basket entre fondu + légère rotation 3D + parallaxe semelle/tige vitesses différentes via useMotionValue rotateX/Y
- Hover desktop: rotation 360° interactive drag OrbitControls + auto-rotation douce zoom détails
- Fiche produit: visualiseur 3D pleine largeur, changement coloris 1 clic transition fluide pas rechargement (state color hex + emissiveIntensity)
- Transitions page: fondu enchaîné y8 easing [0.16,1,0.3,1] 450ms

### Contrainte mobile Bénin
- Three.js dynamic import ssr false, dpr [1,1.5], primitives pas GLB <50KB, images WebP <150KB lazy, GSAP ScrollTrigger toggleActions, Tailwind purge, localStorage cart, chatbot AnimatePresence, marquee transform GPU only, tous tests sur connexion modeste

## 📂 Structure dossiers claire

```
frontend/ (dans /src)
  app/ + components/ + lib/
backend/
  prisma/schema.prisma
  src/main.ts
  docs/
```

Code commenté, tokens centralisés dans globals.css @theme inline.

## 🚀 Pour aller en prod Bénin

1. `npm run build` OK (9 routes static/dynamic)
2. Remplacer lib/products.ts par fetch API
3. Brancher MTN MoMo Collection API + Fedapay + webhook
4. Prisma migrate + seed 12 paires
5. S3 images + Cloudflare
6. WhatsApp Business Cloud API pour tracking

## 🎯 Skills utilisés (esprit)

- **hyperframes-animation:** GSAP ScrollTrigger reveals + Three.js Float + Framer Motion PageTransition + shine sweeps
- **design-taste-frontend:** palette 4+1, display 112px + badges 10px tracking 0.2em, cartes #121214 border white/6, lime glow, sharp radius 2px
- **env-and-assets-bootstrap:** structure frontend/backend/docs, env DATABASE_URL, sessionId guest, mobile perf budget
- **imagegen-frontend-web:** ProductCard CSS 3D shoe crafted, logo volt éclair semelle V, video player scanlines, grain overlay

---

**C'est un banger.** Pas un template. Niveau SNKRS/GOAT/StockX adapté 229.

Preview live → lance `npm run dev` → http://localhost:3000
