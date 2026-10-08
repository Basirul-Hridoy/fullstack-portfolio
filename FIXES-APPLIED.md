# Fixes applied to this build

## 1. Services icon serialization error
`src/constant/services.ts` no longer stores React icon functions. It stores serializable icon keys such as `google`, `youtube`, and `users`.

`src/app/(root)/components/services/service-icon.tsx` maps those keys to the actual `react-icons` components on the UI side.

This prevents the Next.js error:

`Functions cannot be passed directly to Client Components`

It also makes the service data safe to store in Supabase and edit from the future Admin Panel.

## 2. Supabase URL
`.env.local` previously contained `/rest/v1/` in the project URL. Supabase SSR/browser clients expect the project root URL, so it is now:

`https://YOUR_PROJECT_REF.supabase.co`

## 3. Fallback content cleanup
Duplicate fallback review records and duplicate video-review IDs were removed.

## 4. Admin image upload IDs
Admin image upload controls now use unique IDs. This prevents multiple upload fields on the same page from targeting the wrong file input.

## 5. Resume management
The About section now uses `profile.resume_url` from the database instead of the static `info.ts` value, so the Admin Panel can control the resume link.
