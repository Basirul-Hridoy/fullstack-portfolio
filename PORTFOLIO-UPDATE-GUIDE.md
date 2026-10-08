# Ridoy Portfolio — Content & Update Guide

This project keeps editable information in central `src/constant/` files so future updates do not require hunting through UI components.

## 1. Main profile information

**File:** `src/constant/info.ts`

Change these fields here:
- `name`
- `designation`
- `email`
- `whatsapp`
- `profileImage`
- `resumeUrl`
- `facebook`
- `instagram`
- `twitter`
- `linkedin`
- `location`
- `bio`
- `stats`

Social links are used automatically by the footer.

### Profile photo

Put your real profile photo in:

```text
public/images/profile/profileImg.png
```

Then keep:

```ts
profileImage: "/images/profile/profileImg.png"
```

The Navbar uses this same image, so you only need to replace the file.

## 2. Resume

Resume files are organized under:

```text
public/documents/
```

Current path:

```text
public/documents/resume.pdf
```

The download button reads the path from `src/constant/info.ts`:

```ts
resumeUrl: "/documents/resume.pdf"
```

If you later use an image resume instead, put it under `public/documents/`, for example `resume.jpg`, then change only `resumeUrl` to:

```ts
resumeUrl: "/documents/resume.jpg"
```

No component change is needed.

## 3. Services

**File:** `src/constant/services.ts`

The homepage service cards are generated from this array.

Current focus:
1. Google Ads
2. Facebook Marketing
3. YouTube Marketing
4. SEO
5. Local SEO
6. Social Media Management
7. Web Design & Development
8. Content Marketing

To change a service, edit its `title`, `description`, `icon`, or `color` in this file.

## 4. Certificates

**Data:** `src/constant/certificates.ts`

**Images:** `public/images/certificates/`

Each certificate has a unique `id`. The same data powers:
- 3 featured certificates on Home
- All Certificates page
- Full certificate detail route

To replace a certificate image, keep the image in `public/images/certificates/` and update only the `image` path in the constant file.

Example:

```ts
image: "/images/certificates/my-certificate.jpg"
```

Clicking a certificate opens its real certificate image. The All Certificates page also opens the full image in the existing zoom/lightbox experience.

## 5. Case Studies

**File:** `src/constant/case-studies.ts`

**Images:** `public/images/case-studies/`

Update project title, category, description, metrics, challenge, strategy, outcome, and before/after image paths here.

### Case-study URLs

- All: `/case-studies`
- Google Ads: `/case-studies/google-ads`
- Meta Ads: `/case-studies/meta-ads`
- SEO: `/case-studies/seo`
- Social Media: `/case-studies/social-media`
- YouTube: `/case-studies/youtube`
- Individual project: `/case-studies/1`, `/case-studies/2`, etc.

Home intentionally shows exactly 3 case studies and does **not** mark `All` as selected. Clicking `All` opens the dedicated `/case-studies` page.

## 6. Client Reviews

**Data:** `src/constant/reviews.ts`

Update:
- client name
- role
- company
- photo
- review text
- rating

### Reviews pages

- Home section: `/#reviews`
- All reviews: `/reviews`
- Video reviews: `/reviews/videos`

The Home reviews section has buttons for both full review pages.

## 7. Client Video Reviews

**Data:** `src/constant/video-reviews.ts`

Add one object per real client video:

```ts
{
  id: "unique-id",
  clientName: "Client Name",
  role: "Founder",
  company: "Company Name",
  videoUrl: "https://...",
  quote: "Short quote",
}
```

The page is already created at `/reviews/videos`.

## 8. About / My Impact

**Component:** `src/app/(root)/components/about/about.tsx`

Profile content and resume path come from `info.ts`.

The My Impact panel keeps the existing design and now has an additional low-opacity structural grid layer behind the existing background treatment.

If you want to change the four impact numbers, edit the array inside `about.tsx`.

## 9. My Work Process

**Data:** `src/constant/process.ts`

Change process titles/descriptions here.

The right-arrow between steps shifts a few pixels on hover to indicate the next step. The original card design remains unchanged.

## 10. Navbar profile image

**Component:** `src/app/(root)/components/layout/navbar/navbar.tsx`

The Navbar does not contain a hard-coded profile image path. It reads:

```ts
infos.profileImage
```

So normally you only change the image in `public/images/profile/` or update `profileImage` in `info.ts`.

## 11. Styling organization

- Reusable visual patterns and animations belong in `src/app/globals.css`.
- Component-specific spacing/layout can stay as Tailwind classes directly in the component.
- Avoid adding a new global class when an existing Tailwind utility is enough.
- Repeated UI should use the existing reusable components where practical, such as `ServiceCard`, `CaseStudyCard`, `SectionHeading`, and `ProcessStep`.

## 12. Main component locations

```text
src/app/(root)/components/banner/
src/app/(root)/components/services/
src/app/(root)/components/about/
src/app/(root)/components/certificates/
src/app/(root)/components/process/
src/app/(root)/components/case-studies/
src/app/(root)/components/reviews/
src/app/(root)/components/contact/
src/app/(root)/components/layout/navbar/
```

## 13. Public assets

Use this structure for future assets:

```text
public/
├── documents/       # Resume and downloadable documents
├── images/
│   ├── profile/     # Profile/about images
│   ├── certificates/# Real certificate images
│   ├── case-studies/# Before/after project images
│   └── reviews/     # Client review photos if available
└── favicon.ico
```

For a local public image, use `/images/...` in Next.js — do not include `/public` in the URL.

## 14. Before publishing

Run:

```bash
npm install
npm run build
npm run dev
```

Then test:
- Navbar profile image
- All 8 services
- Resume download
- Real certificate images and zoom
- Case-study category URLs
- Individual case studies
- All client reviews
- Video review page
- Social links
- Mobile layout

### Important

Only publish real client names, company names, numbers, testimonials, certificate issuers, and social URLs. Replace the remaining demo values before using the site publicly.
