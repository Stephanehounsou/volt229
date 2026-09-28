# VOLT229 — Déploiement Production Bénin

## 1. Vercel (Frontend Next.js) — Recommandé

```bash
# Depuis volt229/
npm i -g vercel
vercel login
vercel --prod
```

- Framework preset: Next.js
- Region: cdg1 (Paris, plus proche Bénin)
- Env vars: copier `.env.example` → Vercel dashboard → Environment Variables
- Domaine: ajouter volt229.bj + www.volt229.bj dans Vercel Domains

Build vérifié: `npm run build` → 9 routes OK avec vraies images `/public/shoes/*`.

## 2. Backend API — Railway / Render

Backend Express/Prisma dans `/backend`

```bash
cd backend
# Créer package.json prod
npm init -y
npm i express cors helmet @prisma/client dotenv
npm i -D prisma typescript @types/node @types/express
npx prisma generate
# Déployer sur Railway
railway init
railway up
```

Env: `DATABASE_URL` (Supabase PostgreSQL eu-west-1), `MTN_MOMO_*`, `FEDAPAY_API_KEY`, `ANTHROPIC_API_KEY`.

Supabase setup:
```sql
-- Créer DB, puis
npx prisma migrate deploy
npx prisma db seed (ajouter seed.ts avec products)
```

## 3. Images — Optimisation

Actuelles: 30 images réelles dans `/public/shoes/` depuis recherche (GT Jump 2, Jordan 1 Clay, Harden Vol 8, MB.03, TWO WXY, LeBron XXI, Jordan 36, AE1 Storm, KD17, VOLT custom). 

Prod: migrer vers S3 (Scaleway Object Storage fr-par, plus proche Bénin, moins cher) + Cloudflare R2 CDN.

- Convertir en WebP 800px width <120KB via `sharp`
- Ajouter blur placeholder `plaiceholder`

Script:
```bash
npm i sharp
node scripts/optimize-images.js
```

## 4. Mobile Money — MTN MoMo prod

- Créer compte https://momodeveloper.mtn.com
- Subscription key + API User
- Webhook: `https://api.volt229.bj/api/webhooks/mtn-momo`
- Tester en sandbox avec numéro MTN Bénin +229

## 5. Fedapay (fallback carte)

- https://fedapay.com — créer boutique, clé API live, webhook `https://api.volt229.bj/api/webhooks/fedapay`

## 6. Domaine & DNS

- Acheter volt229.bj chez https://www.gandi.net ou registrar .bj
- DNS:
  - @ CNAME cname.vercel-dns.com
  - api CNAME Railway/Render
  - Cloudflare proxy ON pour CDN images

## 7. Monitoring

- Vercel Analytics + Speed Insights
- Sentry pour erreurs front/back
- UptimeRobot pour API

## 8. Checklist go-live

- [x] 12 produits avec vraies images
- [x] Build OK
- [x] Design system $10k
- [x] 7 pages + chatbot + cart + 3D
- [ ] Env prod configuré
- [ ] Prisma migrate
- [ ] MTN MoMo sandbox test
- [ ] Domaine volt229.bj branché
- [ ] WhatsApp Business API tracking

## 9. Commandes rapides

```bash
# Dev local avec vraies images
cd volt229
npm run dev # http://localhost:3000

# Prod local
npm run build && npm run start # http://localhost:3000

# Vérifier images
ls public/shoes/ # 30 files
```

Le site actuel tourne en dev preview avec vraies images branchées sur ProductCard + fiche produit gallery + panier.
