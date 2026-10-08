This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Admin account security

The Admin Panel now supports:
- Forgot password and password reset.
- Change email with Supabase confirmation.
- Change password with current-password verification.
- Sign out all sessions.
- Multiple admin accounts from **Admin → Settings → Admin Access**.
- Removing another user's admin access without deleting their Supabase Auth account.

For inviting brand-new admin emails from the Admin Panel, add the server-only `SUPABASE_SECRET_KEY` to `.env.local` and your production environment. Never prefix it with `NEXT_PUBLIC_` and never expose it in client-side code.

In Supabase **Authentication → URL Configuration**, allow the callback URL for your local and production site, for example:
- `http://localhost:3000/auth/callback`
- `https://your-domain.com/auth/callback`

The exact production domain should match `NEXT_PUBLIC_SITE_URL`.

The existing `public.admin_users` table controls who can enter `/admin`; an authenticated Supabase user is not automatically an administrator.
