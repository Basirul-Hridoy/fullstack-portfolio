# Update Notes V9 — Admin Security & Account Management

Implemented:
- Forgot Password flow with Supabase password recovery.
- `/auth/callback` PKCE exchange route.
- `/admin/reset-password` recovery page.
- `/admin/setup-password` invited-admin onboarding page.
- Account Settings: Change Email, Change Password, Sign Out All Sessions.
- Multi-admin management: list, add/invite, and remove admin access.
- Admin route protection now checks `public.is_admin()` instead of allowing any authenticated Supabase user.
- Server-only Supabase secret-key client for trusted admin actions.
- `admin_users.email` is synchronized with the signed-in user's confirmed email when Settings opens.
- `.env.example` documents the required server-only `SUPABASE_SECRET_KEY`.
