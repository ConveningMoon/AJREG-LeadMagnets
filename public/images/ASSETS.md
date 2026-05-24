# Asset Guide

Replace placeholder images with real files at these exact paths.

| File | Recommended size | Format | Used in |
|------|-----------------|--------|---------|
| `guide-cover.webp` | 340×440 px | WebP | Hero (provided ✓) |
| `adriana.webp` | 400×400 px | WebP | AgentIntro (provided ✓) |
| `logo-white.png` | 280×96 px transparent | PNG | Footer |
| `logo-dark.png` | 280×96 px transparent | PNG | (reserved) |
| `og-image.jpg` | 1200×630 px | JPG | Open Graph / social |
| `testimonials/1.webp` | 200×200 px | WebP | Testimonials card 1 |
| `testimonials/2.webp` | 200×200 px | WebP | Testimonials card 2 |
| `testimonials/3.webp` | 200×200 px | WebP | Testimonials card 3 |

When adding real testimonial photos, also replace the `ImagePlaceholder` in
`components/sections/Testimonials.tsx` with `<Image>` (instructions in comments).

When adding the real logo, replace `ImagePlaceholder` in
`components/sections/Footer.tsx` with `<Image>` (instructions in comments).
