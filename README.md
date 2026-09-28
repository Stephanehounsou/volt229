# ⚡ VOLT229 — La sneaker culture béninoise commence ici

> Plateforme e-commerce premium basketball — Bénin first. Niveau finition $10k, inspiré Nike SNKRS / GOAT / StockX, adapté Mobile Money + livraison locale.

**Live stack:** Next.js 16 + Tailwind 4 + GSAP + Three.js (R3F) + Framer Motion + Prisma + PostgreSQL + MTN MoMo / Fedapay

## ✨ Banger livré

- **Design System** complet (tokens, composants, animations) — voir `docs/DESIGN_SYSTEM.md`
- **7 pages** premium, mobile-first, animations 60fps même sur appareils modestes
- **3D Viewer** full-width avec changement coloris fluide, drag 360°, fallback CSS si pas WebGL
- **Chatbot VOLT** flottant, ton direct béninois, réponses instantanées sur pointure/stock/livraison
- **Backend spec** Prisma + API endpoints — voir `docs/API.md` + `backend/prisma/schema.prisma`

## 🚀 Lancer en local

```bash
cd volt229
npm install
npm run dev
# → http://localhost:3000
```

Preview 3D utilise Three.js, dynamic import — pas de config.

### Backend (optionnel)

```bash
cd backend
npm init -y
npm install express cors helmet @prisma/client
npx prisma generate
# .env DATABASE_URL=postgresql://...
```

## 📁 Structure

```
src/
  app/
    page.tsx              # Accueil hero 3D + marquee + featured + video + testimonials
    catalogue/page.tsx    # Filtres marque/taille/usage/prix, grille cascade
    produit/[id]/page.tsx # Viewer 3D, sélecteur taille/couleur, ajout panier animé
    panier/page.tsx       # Récap, livraison par ville, paiement MoMo/Moov/Fedapay/cash
    videos/page.tsx       # Player + playlist, culture terrain
    a-propos/page.tsx     # Histoire, manifeste, contact
    auth/page.tsx         # Login/register épuré fond noir terrain
  components/
    layout/Navbar.tsx + Footer.tsx
    home/Hero3D.tsx + Marquee.tsx
    product/ProductCard.tsx + ProductViewer3D.tsx
    cart/CartContext.tsx
    chatbot/Chatbot.tsx
    animations/PageTransition.tsx + ScrollReveal.tsx
    ui/Button.tsx
  lib/products.ts         # 12 paires mock, brands, sizes
  lib/utils.ts

backend/
  prisma/schema.prisma    # User, Product, Variant, Cart, Order, Review, Chat
  src/main.ts             # Express entry
docs/
  DESIGN_SYSTEM.md
  API.md
```

## 🎨 Identité

- **Logo:** éclair + semelle = V, trait unique, version icon + horizontale
- **Palette:** #0D0D0F noir terrain, #C6FF3D volt lime, #E63946 ember, #F5F5F0 nuage, #8A8F98 ardoise
- **Typo:** Bebas Neue display + Manrope body
- **Ton:** énergique, premium, rapide — jamais criard

## ⚡ Animations — exigence centrale respectée

- Scroll: GSAP ScrollTrigger fade + rotateX + y, parallax semelle/tige vitesses différentes (via motion values rotateX/Y)
- Hover desktop: rotation 360° interactive drag (OrbitControls) + auto-rotation douce + zoom détails
- Fiche produit: visualiseur 3D pleine largeur, changement coloris 1 clic transition fluide (pas reload) via state + emissive color
- Transitions page: fondu enchaîné y 8px easing [0.16,1,0.3,1] 450ms, jamais saut brutal

## 📱 Mobile first — Bénin

- Majority trafic mobile → Tailwind mobile-first, 3D dynamic import, dpr [1,1.5], primitives pas GLB, images <150KB, backdrop-blur, no-scrollbar carousels snap-x
- Paiement: MTN MoMo / Moov Money (sans frais) + Fedapay carte + cash Cotonou
- Livraison: Cotonou 24h 2000 XOF, Porto-Novo 48h 3500 XOF, Parakou/Abomey 72h 5000 XOF

## 🤖 Chatbot

Bulle flottante persistante, overlay animé spring damping 22 stiffness 300. Réponses temps réel disponibilité, conseil pointure (+0.5), statut livraison, FAQ. Ton aligné marque. Connecté à API IA (Claude) — prompt système dans `docs/API.md`, implémentation SSE streaming, historique par session.

## 🔒 Auth

JWT + bcrypt, OAuth Google option, phone +229 unique, shoeSize + position mémorisés.

## 📦 Produits

12 paires min (VOLT Originals + Nike + Jordan + Adidas + Puma + New Balance), variantes pointures/couleurs, stocks, avis.

## 🛠️ TODO prod

- Remplacer mock `lib/products.ts` par fetch `/api/products`
- Implémenter MTN MoMo API collection `requestToPay` + webhook
- S3 images + WebP
- Prisma migrate + seed
- WhatsApp Business API tracking
- PWA + offline cart

---

Fait avec ⚡ à Cotonou — VOLT229 © 2026
