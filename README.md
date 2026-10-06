# DIDBAN — دیدبان

A Persian RTL demonstration store for surveillance equipment. React 19 + TypeScript + Vite, with procedural React Three Fiber models. Deploy to Vercel using `npm run build` and the `dist` output directory; no custom server or backend is needed.

## Development

Node 22 or newer recommended (validated on Node 24).

```sh
npm ci --cache /tmp/didban-npm-cache
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Editable content

- `src/data.ts`: single business configuration, exactly 50 established brand entries, 18 categories, 90 products generated from 18 explicit editable catalogue rows, FAQs and solution recommendations. Each row defines five unique demo models. All prices and specifications are fictional. Each real brand name is a browsing label and does not imply authorization or real product specifications.
- `src/App.tsx`: customer interface, local search/filter/sort, accessible native product dialog, solution selection and local-only enquiry form.
- `src/Scenes.tsx`: six procedural 3D modes (hero, category, optics, exploded camera, schematic coverage, product detail), reversible viewport-relative scroll progress, reduced motion, offscreen rendering suspension and WebGL error fallback.
- `src/style.css`: navy/cyan art direction, Vazirmatn typography and responsive RTL layouts.
- `public/products/`: individually captured model renders for the demo catalogue, with CSS equipment fallback if an image fails. The live 3D model is available in product details.

The contact form validates locally and shows an explicit demonstration response. It never sends information anywhere. Fictional contact details are plain text, without telephone/email links. This is an enquiry concept, with no checkout, accounts, stock or warranty claims.

## Validation

Production compilation, TypeScript and ESLint checks are required. Browser validation covers brand counts, search, combined filters, sorting, modal Escape, enquiry prefill and validation, FAQ, mobile navigation/filters, responsive widths from 320 to 1440, and down/up scroll progress for each of the five main 3D scenes. The page retains all scenes under reduced motion.

The approximate coverage model and exploded camera are illustrative diagrams, not verified technical models. Brand spellings use established names; live official-site verification was unavailable under the environment's restricted egress policy.
