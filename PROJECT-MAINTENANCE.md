# Ridoy Solutions Portfolio — Production Maintenance Guide

This project keeps the existing dark/premium frontend design but moves editable portfolio content into Supabase. The public site reads published content from the database, while `/admin` provides the management UI.

## 1. What you need to create

### Required
1. A Supabase account.
2. One Supabase project for this portfolio.
3. One Supabase Auth user for your admin login.

### Only credential you need in the Next.js app
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

You do **not** need to put a Supabase service-role/private key into this frontend project. Keep privileged keys out of `.env.local` unless a future server-only feature explicitly needs one.

## 2. First-time Supabase setup

1. Open Supabase and create a new project.
2. Choose a strong database password and save it somewhere safe.
3. In **Authentication → Users**, create an email/password user using the email you want to use as the portfolio administrator.
4. Open **SQL Editor**.
5. Open `supabase-schema.sql` from this project.
6. Replace the text `YOUR_ADMIN_EMAIL` with the exact email you used for the Auth user.
7. Run the complete SQL file once.
8. In **Project Settings → API**, copy:
   - Project URL
   - Publishable key (use the current publishable/anon-style public key shown by your Supabase project)
9. Copy `.env.example` to `.env.local`.
10. Paste your values into `.env.local`.
11. Restart the Next.js development server after changing `.env.local`.

### Important
Never commit `.env.local` to GitHub. The public publishable key is intentionally usable in the browser; the database is protected by Row Level Security. Never expose a service-role key in client code.

## 3. Database structure

The SQL creates these content tables:

- `profiles` — name, designation, contact links, profile/about image, resume, bio, stats.
- `site_settings` — site title, description, hero labels and footer labels.
- `services` — all service cards.
- `certificates` — certificate information and images.
- `case_studies` — complete case-study content, metrics and before/after media.
- `reviews` — written client testimonials.
- `video_reviews` — video testimonials and thumbnails.
- `process_steps` — the working process section.
- `contact_messages` — messages submitted through the portfolio contact form.
- `admin_users` — accounts allowed to modify portfolio content.

## 4. Admin panel

Open:

`/admin/login`

Sign in with the Supabase Auth user you created.

The dashboard contains:

- Dashboard
- Profile
- Services
- Certificates
- Case Studies
- Reviews
- Video Reviews
- Process
- Messages
- Settings

### Content editing rule
Business/content changes should be done from `/admin`.
Design, layout, animation and component behavior should remain in the codebase.

## 5. Images and files

The project creates a public Supabase Storage bucket named:

`portfolio-media`

When you upload a profile photo, certificate, review photo, case-study image or video thumbnail from the admin panel:

1. The file is uploaded to Supabase Storage.
2. Supabase returns a public URL.
3. The URL is saved in the relevant database record.
4. The frontend reads that URL automatically.

You do not need to manually copy image URLs into TypeScript files anymore.

## 6. Existing local assets

The current design still keeps existing local assets such as:

- `/public/images/profile/`
- `/public/images/certificates/`
- `/public/images/case-studies/`
- `/public/documents/resume.pdf`

The seeded database starts with those local paths so the current website remains visually compatible. New uploads can use Supabase Storage.

## 7. Adding a service later

Admin → Services → Add new item.

Fill:

- Service name
- Description
- Icon key
- Accent color
- Display order
- Published

Available icon keys currently include:

`users`, `facebook`, `google`, `youtube`, `location`, `video`, `code`, `pen`

If you want a completely new icon system later, update the icon map in `src/lib/content.ts` and the admin options in `src/components/admin/content-manager.tsx`.

## 8. Adding a certificate

Admin → Certificates → Add new item.

Upload the certificate image directly from the admin panel. The public certificate page will use the stored URL.

## 9. Adding a review

Admin → Reviews → Add new item.

Client photo is optional. If you publish a real client's name, photo or testimonial, get the client's permission first.

## 10. Adding a video review

Admin → Video Reviews → Add new item.

For YouTube, use the embed URL:

`https://www.youtube.com/embed/VIDEO_ID`

Do not paste the normal watch URL if the iframe is expected to load directly.

## 11. Adding a case study

Admin → Case Studies.

The structured fields are stored as JSON where multiple items are needed.

Example metrics:
```json
[
  { "label": "Sales", "value": "+245%" },
  { "label": "ROAS", "value": "3.8x" }
]
```

Example strategy:
```json
[
  "Search intent mapping",
  "Campaign restructuring",
  "Landing page optimization"
]
```

## 12. Contact messages

The contact form now attempts to save the inquiry into `contact_messages`.

Admin → Messages lets you:

- read the inquiry
- mark it read
- archive it
- delete it

If Supabase is not configured yet, the form falls back to the previous Gmail/mail flow.

## 13. What files are important for developers

### Supabase connection
- `src/lib/supabase/browser.ts`
- `src/lib/supabase/server.ts`
- `middleware.ts`

### Database-driven content
- `src/lib/content.ts`

### Admin UI
- `src/components/admin/admin-shell.tsx`
- `src/components/admin/admin-ui.tsx`
- `src/components/admin/content-manager.tsx`
- `src/app/admin/`

### Database/security
- `supabase-schema.sql`

### Environment variables
- `.env.example`
- `.env.local` (local only; never commit)

## 14. How future developers should add a new editable section

1. Add a table or structured content model in `supabase-schema.sql`.
2. Add public read mapping in `src/lib/content.ts`.
3. Add the admin form/page under `src/app/admin/`.
4. Add or reuse a reusable UI component under `src/components/admin/`.
5. Pass the data from the server page to the public component.
6. Keep visual styling in the existing component/Tailwind/CSS system.
7. Add only the important comments explaining security, data mapping or non-obvious behavior.

## 15. Security checklist before production

- [ ] Supabase Auth admin user created.
- [ ] `YOUR_ADMIN_EMAIL` replaced in the SQL before running it.
- [ ] Row Level Security is enabled (the schema does this automatically).
- [ ] `.env.local` is not committed.
- [ ] No service-role/private key appears in browser code.
- [ ] Public signup is disabled after the administrator account is created if you do not need public accounts.
- [ ] Real client testimonials are published only with permission.
- [ ] Production domain is configured in Supabase Auth URL settings when password reset/email flows are enabled.

## 16. Deployment environment variables

If deploying on Netlify/Vercel/etc., add the same two variables in the hosting provider's environment-variable settings:

`NEXT_PUBLIC_SUPABASE_URL`

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Then redeploy.

## 17. Normal maintenance

For everyday work, use this rule:

**Content update → Admin Panel**

**Design/animation/component change → Code**

**Database/security change → `supabase-schema.sql` + Supabase SQL Editor**

This separation keeps the portfolio easy to maintain without turning the frontend into an unstructured CMS.
