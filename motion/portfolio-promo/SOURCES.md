# Sources

Every claim and number on screen, and where it comes from in the portfolio's source (`moyo-dev/src`).

| On screen | Source |
|---|---|
| "Building something complicated?" | `components/site-footer.tsx`, the contact heading |
| "Complicated flows, simple interfaces." | shortened from `data/site.ts` `tagline` |
| Social Shake · UGC marketplace · 500+ creators | `data/projects.ts` `social-shake` `outcome` ("brief, hire and pay 500+ creators") |
| Gixel · one photo → a whole campaign | `data/projects.ts` `gixel` `outcome` ("Turns one product photo into a whole fashion campaign") |
| DevFest Lagos 2024 · frontend engineer | `data/projects.ts` `devfest-lagos-2024` `role` |
| 82% → 96% accessibility, WCAG 2.1 AA | `data/projects.ts` `devfest-lagos-2024` `outcome` |
| Available for roles | `data/site.ts` `availableForRoles: true` |
| Moyomade Adegbite · Frontend developer | `data/site.ts` `name`, `role` |
| moyomade.dev | supplied by the user, 2026-10-25 |

Screens: `assets/screens/hero_*.png`, `nav_light.png` captured from the production build by `tools/capture-site.mjs`; project images copied from `public/images/work/`.
