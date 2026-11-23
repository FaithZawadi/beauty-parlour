# Tommy's Lounge — Hotel & Lounge website

Luxury multi-branch hotel website.

| Part | Stack | Folder |
|------|-------|--------|
| Website | Next.js 16 (Node, React 19, TypeScript) | `frontend/` |
| API | Laravel 13 (PHP 8.3) | `backend/` |
| Database | PostgreSQL 16 | — |

```
Browser ──> Next.js (port 3000) ──> Laravel API (port 8000) ──> PostgreSQL
```

**Pages:** Home · Our Branches · Branch detail · Rooms & Suites · Dining & Lounge ·
Meetings & Events · About · Contact · Book (multi-step reservation with live total).

**API (`/api`)**

| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/branches` | Active branches with their room types and nightly rates |
| GET  | `/branches/{slug}` | One branch |
| GET  | `/room-types` | Room types, the branches that offer them and "from" price |
| POST | `/bookings` | Reservation request (validates dates, capacity and availability; returns a `TL-XXXXXX` reference) |
| POST | `/contact` | Contact / event enquiry |
| POST | `/newsletter` | Newsletter sign-up |

**Database tables:** `branches`, `room_types`, `branch_room_type` (price and room
count per branch), `bookings`, `contact_messages`, `newsletter_subscribers`.

## Running locally

### 1. PostgreSQL

```sql
CREATE USER tommys WITH PASSWORD 'secret';
CREATE DATABASE tommys_lounge OWNER tommys;
```

### 2. Laravel API

```bash
cd backend
composer install
cp .env.example .env        # DB settings are already set for PostgreSQL
php artisan key:generate
php artisan migrate --seed  # creates tables + sample branches/rooms
php artisan serve           # http://127.0.0.1:8000
```

### 3. Next.js website

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev                 # http://localhost:3000
```

## Hosting on Render

`render.yaml` sets up everything in one go:

| Render service | What it is |
|---|---|
| `tommys-db` | PostgreSQL database |
| `tommys-api` | Laravel API (Docker, `backend/Dockerfile`) |
| `tommys-web` | Next.js website (Node) |

1. Push this repository to GitHub.
2. In Render: **New → Blueprint**, connect GitHub and pick this repository.
3. Click **Apply**. Render creates the database and both services, connects
   them and deploys. The first deploy takes about 5–10 minutes.
4. Open the `tommys-web` URL (e.g. `https://tommys-web.onrender.com`).

On every deploy the API runs its migrations and reloads branches/rooms/prices
from `DatabaseSeeder.php` (set `SEED_ON_START=false` on `tommys-api` to stop
that). Bookings, messages and subscribers are never touched.

**Plans:** the blueprint uses the free plan. Free services sleep after 15
minutes without visitors (the next visit takes about a minute) and the free
database is deleted after 30 days. For the live site, change the three
`plan: free` lines to `plan: starter` (or upgrade in the dashboard).

**Your own domain:** add it under `tommys-web → Settings → Custom Domains`,
then add it to `FRONTEND_URL` on `tommys-api` (comma-separated, e.g.
`tommys-web.onrender.com,www.tommyslounge.co.ke`).

## Replacing the sample content

The real Tommy's Lounge details were not available when this was built, so
**branches, addresses, phone numbers, prices and reviews are placeholders.**

- Branches, rooms and prices: `backend/database/seeders/DatabaseSeeder.php`,
  then `php artisan migrate:fresh --seed` (or edit the tables directly).
- Hotel name, contact details, dining, venues, reviews:
  `frontend/src/data/site.ts`.
- Photos: put your own images in `frontend/public/images/` and point the keys
  in `IMAGES` (in `site.ts`) at them, e.g. `hero: "/images/hero.jpg"`. The
  placeholders are Unsplash photos.
