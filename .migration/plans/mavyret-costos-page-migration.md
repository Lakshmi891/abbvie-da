# MAVYRET Costos Page Migration Plan

## Overview
Migrate `https://www.mavyretpr.com/costos` into Adobe Edge Delivery Services (EDS) without modifying existing global/shared files (styles.css, fonts.css, header, footer, navigation).

## Page Analysis Summary

The "Costos" page is a Spanish-language pharmaceutical cost information page for MAVYRET (AbbVie). It contains:
- A hero/banner section with the page title
- An enrollment CTA section (AbbVie Contigo program)
- A cost breakdown grid showing insurance categories
- A lengthy ISI (Important Safety Information) section
- Standard header/footer (already existing in project)

## Existing Project Assets (Do NOT Modify)
- `styles/styles.css` — Global styles with CSS custom properties
- `styles/fonts.css` — Roboto & Roboto Condensed font definitions
- `styles/lazy-styles.css` — Lazy-loaded global styles
- `blocks/header/` — Shared header block
- `blocks/footer/` — Shared footer block
- `blocks/hero/` — Existing hero block (image background + h1)
- `blocks/cards/` — Existing cards block (grid of image + text cards)
- `blocks/columns/` — Existing columns block (side-by-side layout)
- `blocks/fragment/` — Fragment inclusion block
- `scripts/scripts.js` — Global decoration logic
- `scripts/aem.js` — Core AEM library (never modify)

## Blocks Identified on Page

| # | Block Name | Type | Reusable? | Notes |
|---|-----------|------|-----------|-------|
| 1 | `hero` (existing) | Hero banner | Yes | Existing block can be reused with text-only variant (no background image) or page-specific styling |
| 2 | `cost-table` (new) | Info grid/table | Yes | Insurance category grid with icons, headings, descriptions |
| 3 | `cta-banner` (new) | Call-to-action | Yes | Centered CTA with logo lockup, heading, description, button |
| 4 | `isi` (new) | Safety information | Yes | Scrollable/expandable safety information disclosure block |

## Block Variants

### Hero (existing block — variant: `hero (text-centered)`)
- The costos page hero is text-centered with a colored background (no background image)
- Can be handled as a section with styling metadata rather than modifying the hero block
- Alternative: Use default content (h1 + paragraph) in a section with background color metadata

### Cost Table (new block)
- Grid layout showing 5 insurance categories
- Each cell has: icon/image, category heading, description text, optional link
- Responsive: stacks on mobile, 2-3 columns on tablet, up to 5 on desktop
- Reusable pattern for any tabular comparison content

### CTA Banner (new block)
- Logo/image + heading + description + primary button
- Centered layout with optional background color
- Could also be handled as a section with default content + button styling

### ISI Block (new block)
- Long-form safety information with structured headings
- May use a scrollable container or expandable accordion pattern
- Standard pharma pattern — highly reusable across MAVYRET pages

## Files to Create

### New Blocks
```
blocks/cost-table/
  ├── cost-table.js        # Decoration logic for the grid
  └── cost-table.css       # Grid styling, responsive layout

blocks/cta-banner/
  ├── cta-banner.js        # Minimal decoration
  └── cta-banner.css       # Centered CTA styling

blocks/isi/
  ├── isi.js               # Scrollable container / expand logic
  └── isi.css              # ISI-specific typography and container styles
```

### Content File
```
content/costos.plain.html   # The migrated page content in EDS markup format
```

### Import Infrastructure (generated via migration skill)
```
tools/importer/            # Import scripts for content generation
```

## Section Structure (Top to Bottom)

1. **Section 1 — Hero/Title** (section metadata: background color navy/dark blue)
   - MAVYRET logo image
   - H1: "¿Tiene preguntas sobre costos?"
   - Paragraph: descriptive subheading text

2. **Section 2 — CTA Banner** (cta-banner block)
   - Partner logos lockup image
   - "INSCRÍBETE HOY" button → links to AbbVie Contigo enrollment
   - Program description paragraph

3. **Section 3 — Cost Breakdown** (cost-table block)
   - Heading: cost information intro
   - 5-cell grid: Commercial, Medicaid, Medicare Part D, Other Insurance, Uninsured
   - WAC pricing disclaimer text

4. **Section 4 — ISI** (isi block)
   - "INFORMACIÓN IMPORTANTE DE SEGURIDAD" heading
   - Full prescribing safety information with sub-sections
   - Links to PDF documents

5. **Section 5 — Footer** (existing footer fragment — no changes)

## Implementation Approach

Use the `excat-site-migration` skill to orchestrate:
1. Page analysis of the source URL
2. Block mapping and variant detection
3. Import infrastructure generation (parsers + transformers)
4. Content import execution
5. Block CSS development for visual fidelity
6. Visual validation against original

## Key Constraints
- **No modifications** to: `styles/styles.css`, `styles/fonts.css`, `scripts/scripts.js`, `scripts/aem.js`, header/footer/nav blocks
- Page-specific CSS only in new block CSS files
- All text content in Spanish
- Responsive design: mobile-first with breakpoints at 600px / 900px / 1200px
- Must pass AEM linting (`npm run lint`)
- Semantic HTML structure following EDS conventions

## Checklist

- [ ] Run page analysis on `https://www.mavyretpr.com/costos` to extract full DOM structure
- [ ] Identify and confirm block variants (reuse existing blocks where possible)
- [ ] Create `blocks/cost-table/cost-table.js` — grid decoration logic
- [ ] Create `blocks/cost-table/cost-table.css` — responsive grid styling
- [ ] Create `blocks/cta-banner/cta-banner.js` — CTA decoration logic
- [ ] Create `blocks/cta-banner/cta-banner.css` — centered CTA styling
- [ ] Create `blocks/isi/isi.js` — ISI container decoration
- [ ] Create `blocks/isi/isi.css` — ISI typography and scroll/expand styles
- [ ] Generate import infrastructure (parsers + transformers)
- [ ] Generate `content/costos.plain.html` via import script execution
- [ ] Validate page renders correctly in local dev server
- [ ] Visual comparison against live site for fidelity
- [ ] Run `npm run lint` to ensure code quality
- [ ] Verify responsive behavior at all breakpoints (mobile, tablet, desktop)
- [ ] Confirm no global/shared files were modified

## Risks & Considerations
- The ISI section contains extensive legal/medical text — must be imported verbatim
- Brand colors (navy, specific hex values) need extraction from the live site via computed styles
- Partner logo images need to be downloaded and placed in the project
- The cost table structure may need adjustment based on actual DOM analysis
- Spanish language content — ensure `lang="es"` is set appropriately on the page

---

*This plan requires Execute mode to proceed with implementation. Switch out of Plan mode to begin the migration.*
