# Lanka Commercial Motors (LCM) — Demo Site

A demo dealer website for **Lanka Commercial Motors**, a fictional authorised dealer & service partner for **TATA commercial vehicles in Sri Lanka**. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Supabase.

> **This is a demo build.** Branding, copy, prices, contact details and several images are placeholders. See [§ Placeholder Checklist](#placeholder-checklist-before-going-live) before launching for a real client.

---

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Supabase** — Postgres, Auth, Storage
- **react-hook-form + zod** for form validation
- Custom **EN / SI / TA** i18n (React context + JSON dictionaries)
- **recharts** for the admin dashboard chart
- **lucide-react** for icons

## Project Structure

```
src/
  app/
    (public)/        # marketing site — wrapped in Header/Footer/WhatsApp button
      page.tsx        # home
      vehicles/...    # catalog: listing, category, detail
      service/        # book, packages, roadside-assistance
      test-drive/, parts/, contact/, about/, offers/, locate-us/
      terms/, privacy/, cookie-policy/
    admin/
      login/          # public — admin sign-in
      (authenticated)/ # protected — own shell (sidebar + topbar, no public chrome)
        page.tsx       # dashboard
        service-bookings/, test-drive-bookings/, parts-enquiries/, enquiries/
        vehicles/, branches/, users/
  components/         # ui/, layout/, vehicles/, forms/, admin/, home/
  lib/
    actions/          # "use server" mutations (auth, bookings, vehicles, branches, users)
    supabase/         # browser / server / middleware clients
    data.ts, admin-data.ts, validation.ts, validation-admin.ts
  i18n/               # LanguageProvider (EN/SI/TA)
  locales/            # en.json, si.json, ta.json
scripts/
  seed.mjs            # idempotent demo data seeder
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase project's values (Project Settings → API):

```bash
cp .env.example .env.local
```

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Project Settings → API → Publishable key (safe for the browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → Service role key (**server-only, never commit**) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Business WhatsApp number, digits only, e.g. `94771234567` |

### 3. Database schema

This project's tables (`vehicle_categories`, `vehicles`, `vehicle_variants`, `branches`, `service_bookings`, `test_drive_bookings`, `parts_enquiries`, `general_enquiries`) and their RLS policies, plus a `vehicle-images` Storage bucket, were created directly in the target Supabase project via SQL (see the schema in this README's git history / the original migration run). If you're pointing this app at a **different** Supabase project, you'll need to create the same schema — ask for the schema SQL or recreate it from `src/lib/database.types.ts`, which mirrors every table exactly.

The app **does not** touch any other tables that may already exist in a shared Supabase project — every policy, grant and the storage bucket are explicitly scoped to LCM's own tables/bucket only.

### 4. Seed demo data

```bash
npm run seed
```

This populates 6 vehicle categories, 14 demo TATA vehicles (with real Wikimedia Commons photos as stand-ins), a handful of variants, and 4 branches across Colombo, Kandy, Kurunegala and Galle. The script is idempotent — safe to re-run.

### 5. Run the app

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 6. Log in to the admin panel

Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

```
Email:    admin@tatacom.lk
Password: LcmAdmin@2026!
```

From **Admin → Users** you can add further admin accounts or remove this one once you've created your own. **Change this password** (or create a new admin user and delete this one) before handing the site to a client.

---

## Admin Panel

| Section | What it does |
|---|---|
| **Dashboard** | Stat cards (today's/pending bookings & enquiries, active vehicles, branches), a 14-day bookings chart, recent activity feed |
| **Service Bookings / Test Drive Bookings / Parts Enquiries / General Enquiries** | Search, filter (status / branch / date), inline status updates (`New → Confirmed → In Progress → Completed → Cancelled`) |
| **Vehicles** | Full CRUD — name, slug, category, price, tagline, specs, brochure URL, active/inactive, sort order, **hero image + gallery upload to Supabase Storage** |
| **Branches** | Full CRUD — address, district, phone, email, lat/lng (used for the embedded map on `/locate-us`), hours, active/inactive |
| **Users** | Lists/creates/removes admin accounts. Scoped so it can never see or touch unrelated users if this Supabase project is shared with another app |

All admin routes are protected by middleware (redirects to `/admin/login` if not authenticated) and live in their own route group with no public-site header/footer.

---

## Trilingual UI (EN / SI / TA)

The language switcher in the header swaps navigation, footer, buttons and form labels between English, Sinhala and Tamil, persisted in `localStorage`/cookie. Vehicle names and specs are kept in English per the original brief; long-form marketing copy on About/Offers/etc. is English-only in this demo. Sinhala/Tamil strings live in `src/locales/si.json` / `ta.json` — **have a native speaker review them before going live.**

---

## Placeholder Checklist (before going live)

Search the codebase for `[PLACEHOLDER]` for the full list. Key items:

- [ ] **Logo** — replace the "LCM | Lanka Commercial Motors" text wordmark with the real logo
- [ ] **Brand colour** — confirm `#1A4F8B` (primary) / `#F2811D` (accent) in `tailwind.config.ts`
- [ ] **Phone, email, address** — `src/lib/site-config.ts`
- [ ] **WhatsApp number** — `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`
- [ ] **Social links** — Facebook/YouTube/Instagram URLs in `src/lib/site-config.ts`
- [ ] **Vehicle prices & specs** — all seeded via `scripts/seed.mjs`, currently indicative only
- [ ] **Vehicle & category images** — currently real but generic Wikimedia Commons stock photos; swap for the client's own brochure photography via Admin → Vehicles (uploads go to Supabase Storage)
- [ ] **Vehicle brochure PDFs** — `brochure_url` is empty for every vehicle
- [ ] **Branch addresses, phone numbers, opening hours, lat/lng** — `scripts/seed.mjs` / Admin → Branches
- [ ] **Service package pricing** — `src/app/(public)/service/packages/page.tsx`
- [ ] **Offers & finance partner list** — `src/app/(public)/offers/page.tsx`
- [ ] **About Us copy & stats** — `src/app/(public)/about/page.tsx`
- [ ] **Terms / Privacy / Cookie Policy** — currently demo placeholder legal text
- [ ] **Sinhala/Tamil translations** — native-speaker review of `src/locales/si.json` and `ta.json`
- [ ] **Admin password** — rotate `admin@tatacom.lk`'s password or replace with a real admin account
- [ ] Remove the "Demo site — placeholder content" notice from the footer

---

## Notes on the Supabase Project

If this Supabase project is shared with another, unrelated application:

- This app only ever reads/writes its own 8 tables and its own `vehicle-images` storage bucket — nothing else is touched.
- The Admin → Users page only lists/manages accounts explicitly tagged `app_metadata.role = "admin"` at creation time, so it never surfaces or risks deleting another app's users.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run seed` | Seed/refresh demo data (idempotent) |
