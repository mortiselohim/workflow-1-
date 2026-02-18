# MOTOX API Routes

## Auth
- `POST /v1/auth/otp/request`
- `POST /v1/auth/otp/verify`
- `POST /v1/auth/refresh`
- `POST /v1/auth/logout`

## Users & Profiles
- `GET /v1/users/me`
- `PATCH /v1/users/me`
- `POST /v1/users/role/switch`
- `POST /v1/users/emergency-contacts`
- `GET /v1/users/addresses`
- `POST /v1/users/addresses`

## Rider Onboarding
- `GET /v1/riders/me`
- `PATCH /v1/riders/me`
- `POST /v1/riders/documents`
- `POST /v1/riders/bikes`
- `PATCH /v1/riders/availability`
- `PATCH /v1/riders/service-toggles`

## Services / Orders
- `POST /v1/trips/estimate`
- `POST /v1/trips`
- `GET /v1/trips/:id`
- `POST /v1/trips/:id/accept`
- `POST /v1/trips/:id/arrive`
- `POST /v1/trips/:id/start`
- `POST /v1/trips/:id/complete`
- `POST /v1/trips/:id/cancel`
- `POST /v1/trips/:id/proof-delivery`

## Matching & Tracking
- `POST /v1/matching/find-nearby`
- `POST /v1/tracking/location`
- `GET /v1/tracking/trips/:id/live`
- `WS /ws/trips`
- `WS /ws/rider-location`

## Pricing & Tiers
- `GET /v1/pricing/tiers`
- `GET /v1/pricing/rules`
- `POST /v1/pricing/estimate`
- `PATCH /v1/admin/pricing/rules/:id`

## Ratings, Rewards, Tombola
- `POST /v1/ratings`
- `GET /v1/riders/me/rating-summary`
- `GET /v1/rewards/levels`
- `GET /v1/tombola/passenger/progress`
- `GET /v1/tombola/rider/progress`
- `POST /v1/admin/tombola/draw`

## Promotions / Referrals / Wallet
- `POST /v1/promos/validate`
- `POST /v1/referrals/redeem`
- `GET /v1/wallet/credits`
- `GET /v1/wallet/vouchers`

## Safety / Support
- `POST /v1/safety/sos-event`
- `POST /v1/incidents/report`
- `POST /v1/support/tickets`
- `GET /v1/support/tickets/me`

## Admin
- `GET /v1/admin/users`
- `GET /v1/admin/riders`
- `GET /v1/admin/trips`
- `GET /v1/admin/incidents`
- `POST /v1/admin/content/banners`
