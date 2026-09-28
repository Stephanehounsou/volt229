# VOLT229 — API Spec

Base URL: `https://api.volt229.bj/api` (prod) / `http://localhost:4000/api` (dev)

## Auth — JWT + bcrypt + OAuth Google

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /auth/register | { name, phone, email?, password, shoeSize?, position? } → { user, token } | No |
| POST | /auth/login | { phoneOrEmail, password } → { user, token } | No |
| POST | /auth/google | { idToken } → { user, token } (Google OAuth) | No |
| POST | /auth/refresh | { refreshToken } → { token } | Yes |
| GET | /auth/me | Current user profile | Yes |
| PATCH | /auth/me | Update size, position, name | Yes |

JWT: `Authorization: Bearer <token>` — 7d access, 30d refresh httpOnly cookie.

## Products

| Method | Endpoint | Query | Description |
|--------|----------|-------|-------------|
| GET | /products | ?brand=VOLT&category=performance&size=42&priceMax=100000&search=arc-1&sort=newest&page=1&limit=12 | List with filters, pagination |
| GET | /products/:idOrSlug | — | Detail + variants + reviews |
| GET | /products/:id/similar | — | 3 similar by brand/category |
| POST | /products | — | Create (ADMIN) |
| PATCH | /products/:id | — | Update stock, price (ADMIN) |
| DELETE | /products/:id | — | Soft delete (ADMIN) |

Response example:
```json
{
  "id": "volt-001",
  "name": "VOLT ARC-1 'Cotonou Night'",
  "brand": "VOLT",
  "price": 89000,
  "variants": [{ "size": 42, "colorName": "Night Volt", "stock": 4, "sku": "VOLT-ARC1-NV-42" }]
}
```

## Cart (guest + auth)

Uses `X-Session-Id` header for guests (stored in localStorage).

| Method | Endpoint | Body |
|--------|----------|------|
| GET | /cart | — |
| POST | /cart/items | { productId, size, colorName, qty } |
| PATCH | /cart/items/:itemId | { qty } |
| DELETE | /cart/items/:itemId | — |
| DELETE | /cart | Clear |

## Orders

| Method | Endpoint | Body |
|--------|----------|------|
| POST | /orders | { items: [{productId,size,colorName,qty}], city, address, phone, paymentMethod: "MTN_MOMO" } → creates Order PENDING |
| POST | /orders/:id/pay | { phoneNumber } → initiates MTN MoMo / Moov / Fedapay |
| POST | /webhooks/mtn-momo | MTN callback → updates Order to PAID |
| POST | /webhooks/fedapay | Fedapay callback |
| GET | /orders | My orders (auth) or ?sessionId=guest |
| GET | /orders/:id | Detail + tracking |
| PATCH | /orders/:id/status | ADMIN only |

Order flow:
1. Client POST /orders → Order PENDING + orderNumber VOLT-229-XXXX
2. Client POST /orders/:id/pay with MoMo phone → API calls MTN MoMo API `requestToPay`
3. User validates USSD, MTN hits /webhooks/mtn-momo → Order PAID → triggers WhatsApp notification via Twilio/WhatsApp Business API
4. Admin prepares, ships → status updates → client polling /orders/:id or websocket.

## Chat — IA SAV

| Method | Endpoint | Body |
|--------|----------|------|
| POST | /chat/sessions | { sessionId? } → { sessionId } |
| GET | /chat/sessions/:sessionId/messages | — |
| POST | /chat/sessions/:sessionId/messages | { content } → streams assistant response (SSE) |

System prompt (Claude):
```
Tu es VOLT, assistant VOLT229, boutique sneakers basketball Bénin.
Ton: énergique, premium, rapide, jamais criard. Tu connais:
- Stock local Cotonou, pointures 38-47
- Paiement MTN MoMo / Moov Money / Fedapay / cash
- Livraison 24h Cotonou 2000 XOF, 48h Porto-Novo 3500 XOF
- Guide pointure: +0.5 vs ville
- Authenticité 100%, QR vérifiable
- Produits: VOLT ARC-1, COURT-229, Nike GT Jump, LeBron XXI, etc.
Tu es concis, tu poses 1 question pour conseiller, tu proposes 2-3 modèles max.
```

Implementation: POST to Anthropic Claude API with history, streaming via SSE `text/event-stream`.

## Reviews

| Method | Endpoint | Body |
|--------|----------|------|
| POST | /products/:id/reviews | { rating, comment } (auth, must have purchased) |
| GET | /products/:id/reviews | List |

## Infra notes Bénin

- Mobile Money: MTN MoMo API (Collection + Disbursement), Moov Money via Hub2 / CinetPay fallback
- Fedapay for card: https://fedapay.com/docs
- WhatsApp tracking: WhatsApp Business Cloud API
- Image storage: S3 compatible (Scaleway or AWS af-south)
- CDN: Cloudflare for images + Next.js
- DB: PostgreSQL on Supabase / Railway, Prisma
- Performance mobile: images WebP, <150KB, lazy load, Three.js dynamic import + fallback CSS shoe if WebGL unavailable
