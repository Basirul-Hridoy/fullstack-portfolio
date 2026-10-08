# Realtime, loading and media fixes

## What was fixed

### 1. Home sections invisible
The home page had `.reveal-section { opacity: 0 }`, but the `ScrollAnimation` client component was not mounted anywhere. The sections therefore kept their layout height while remaining transparent.

`src/app/layout.tsx` now mounts the realtime client and the reveal observer is mounted through the root page flow. If you add more `[data-reveal]` sections, make sure the scroll observer remains mounted.

### 2. Image upload `crypto.randomUUID is not a function`
The uploader now uses `crypto.randomUUID()` when available and falls back to a safe unique browser filename when that API is unavailable.

File: `src/components/admin/admin-ui.tsx`

### 3. Skeleton loading
The public home route now has a page-level loading skeleton in:

`src/app/(root)/loading.tsx`

Admin content managers show skeletons while Supabase data is loading. Dashboard, Profile, Settings and Messages also have loading states.

### 4. Realtime updates
The public site subscribes to Supabase Realtime changes for profile, settings, services, certificates, case studies, reviews, video reviews and process steps. When an admin changes content, the open public page refreshes its server data automatically.

Admin list pages also subscribe to their table, so changes from another admin tab are reflected without a manual refresh.

The schema includes a Realtime publication block. If your Supabase project was created earlier and the block did not enable the tables, go to:

`Supabase Dashboard → Database → Replication`

and enable Realtime for the listed public tables, or rerun the final Realtime block from `supabase-schema.sql` in SQL Editor.

### 5. Supabase Storage images
Database-backed images can come from Supabase Storage. Relevant public `<Image>` components use `unoptimized` so a Supabase Storage URL does not need to be added to Next Image's remote host allowlist.

### 6. Process admin route
The Process admin page now correctly uses `process_steps` instead of the non-existent `process` table.

## Recommended workflow

1. Open Admin Panel.
2. Add/edit content.
3. Save/Publish.
4. Keep the public portfolio open in another tab.
5. With Supabase Realtime enabled, the public content refreshes automatically.
