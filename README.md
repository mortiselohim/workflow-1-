# MOTOX Monorepo

Production-ready scaffold for a motorcycle-first super app targeting Morocco (MAD) with global scalability.

## Stack (Option A)
- **Mobile**: Flutter (Passenger + Rider role switch in one app)
- **Backend**: Node.js + NestJS + PostgreSQL + PostGIS + Redis + WebSockets + Firebase push hooks
- **Admin**: Next.js dashboard

## A) Architecture Diagram (Text)

```text
[Flutter Mobile App]
  ├─ Passenger Experience
  ├─ Rider Experience
  └─ Shared Auth/Wallet/Safety/SOS
           |
           v
[NestJS API Gateway + Domain Modules]
  ├─ Auth (OTP/JWT/RBAC)
  ├─ Trips/Orders (Ride, Delivery, Shopping, Food, Rent, Maintenance)
  ├─ Matching (PostGIS nearby search + level radius)
  ├─ Pricing Engine (tiers, city-zone rules, surge, promos)
  ├─ Ratings/Rewards/Tombola
  ├─ Referrals/Credits/Vouchers
  ├─ Support/Safety/Incidents
  ├─ Realtime Gateway (WebSocket trip + location channels)
  └─ Admin APIs
           |
   ┌───────┼───────────────────────────┐
   v       v                           v
[PostgreSQL + PostGIS]          [Redis Cache/Queues]      [Firebase FCM]
   ├─ transactional data          ├─ pricing cache          └─ push notifications
   └─ geospatial indexes          └─ presence/session
           |
           v
[Next.js Admin Dashboard]
  ├─ user/rider verification
  ├─ trips/orders monitoring
  ├─ pricing tiers/surge config
  ├─ promos/referrals
  ├─ tombola eligibility/winners
  └─ incident + content management
```

## B) Data Model

Implemented in `backend/prisma/schema.prisma` with full entities including users, riders, bikes, tiers, pricing rules, trips, trip events, locations, ratings, rewards levels, tombola entries, vouchers, credits, promos, referrals, support tickets, and audit logs.

## C) API Routes (Grouped)

See `docs/api-routes.md` for grouped route definitions.

## D) UI Navigation Map

See `docs/navigation-map.md` for Passenger + Rider + Admin screen maps.

## E) Generated Codebase

- `mobile_flutter/`: Flutter app with role-switch architecture and required screen scaffolds.
- `backend/`: NestJS modular backend scaffold with pricing, matching, ratings, tombola, referrals, support, tracking.
- `admin_web/`: Next.js admin dashboard scaffold with management sections.

## Local Setup

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

### Mobile
```bash
cd mobile_flutter
flutter pub get
flutter run
```

### Admin
```bash
cd admin_web
npm install
npm run dev
```

## Production Notes
- Deploy backend as containers (API + workers) behind load balancer.
- Use managed PostgreSQL with PostGIS and managed Redis.
- Configure FCM credentials for push.
- Add observability stack (OpenTelemetry + Prometheus + Grafana + Loki).
