# Ridoy Ahmed — Digital Marketing Portfolio

This project is a redesign of the original Next.js portfolio into a dark, blue-neon digital marketing portfolio while keeping the existing App Router/component architecture.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Main sections

1. Hero + animated campaign growth dashboard
2. Digital Marketing Services
3. About / positioning
4. Working Process
5. Proven Case Studies + category filters
6. Client Reviews
7. Contact
8. Footer

## Important files

- `src/app/(root)/page.tsx` — homepage section order
- `src/app/(root)/components/banner/` — hero + campaign dashboard + animated SVG growth chart
- `src/app/(root)/components/services/` — services cards
- `src/app/(root)/components/process/` — working process
- `src/app/(root)/components/case-studies/` — case study cards + filters
- `src/app/(root)/components/reviews/` — testimonials
- `src/app/(root)/components/contact/` — contact details + form
- `src/constant/` — editable content/data
- `src/app/globals.css` — global visual system, gradients, glow, fields, buttons
- `tailwind.config.ts` — theme colors
- `public/images/profile/ridoy-ahmed.png` — replace this placeholder with the final profile photo

## Replace demo content

The case studies and reviews are intentionally editable demo content. Before publishing, replace them with real projects, screenshots, verified metrics, and genuine client feedback.

## Case study images

You can add real images under `public/images/case-studies/` and extend `src/constant/case-studies.ts` with an image field when you are ready to use actual project screenshots.

## Hero growth chart

The hero chart is an inline SVG animated with Framer Motion, so it does not require a chart-image asset or a new chart dependency. It draws from left to right on first render and then reveals the growth badge and dashboard metrics.

## Responsive behavior

The layout uses Tailwind breakpoints for mobile, tablet and desktop. The dashboard, service grid, process cards, case studies, reviews and contact form collapse progressively at smaller widths.

## Smooth scrolling

The existing Lenis integration has been retained in `src/components/scroll-animation.tsx`.
