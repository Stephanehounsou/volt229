# VOLT229 — Déploiement — Status

## ✅ Vraies images branchées

- 30 images réelles dans `/public/shoes/` (2.5MB total)
  - Nike GT Jump 2 volt, Jordan 1 Clay, Harden Vol 8, MB.03 Sunset, TWO WXY v4, LeBron XXI, Jordan 36 White, AE1 Storm Grey, KD17 Easy Money, VOLT custom volt lime
- `src/lib/products.ts` mis à jour: champ `image` + `colors[].images` pointe vers `/shoes/*`
- `ProductCard` refactor: <img> réelle avec object-cover, hover scale 1.08, gradient overlay, badge tech, 360° hint
- `produit/[id]` : gallery 6 images cliquables + hero photo réelle + 3D viewer en dessous
- `panier` : miniatures réelles
- Build OK: 9 routes static/dynamic, 30 images servies

## ✅ Production build

- `npm run build` OK (Turbopack)
- Prod server lancé sur :3001 (preview https://3001-xxx.e2b.app)
- Dev server toujours sur :3000 avec HMR
- Dockerfile prêt pour Railway/Render/Fly.io
- vercel.json configuré region cdg1 (Paris proche Bénin)

## 🚀 Déploiement Vercel — Étapes finales (à faire avec ton compte)

```bash
cd volt229
vercel --prod
# Env vars à ajouter dans Vercel dashboard:
# NEXT_PUBLIC_SITE_URL=https://volt229.bj
```

Ou via GitHub:
1. Push ce dossier sur GitHub `volt229`
2. Import dans Vercel → Next.js preset → Deploy

## Backend deploy (optionnel mais prêt)

- Prisma schema prêt pour Supabase PostgreSQL
- `docs/API.md` + `backend/` + `.env.example`
- Railway: `railway up` depuis `/backend`

## Preview live

- Dev: http://localhost:3000 (avec vraies images)
- Prod: http://localhost:3001 (build optimisé)

Tu peux maintenant naviguer catalogue → voir vraies photos → fiche produit → gallery → panier → checkout MoMo.

Prochaine étape: je peux pousser sur GitHub et connecter Vercel si tu me donnes token, ou générer ZIP livrable.
