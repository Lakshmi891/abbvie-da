# Header/Navigation Styling Plan — Match Live Design

## Overview
Modify `blocks/header/header.css` to match the live MAVYRET costos page navigation/header design shown in the screenshot.

## Live Site Header Design Analysis (from screenshot)

The live header has these visual characteristics:

1. **Full-width bar** with semi-transparent/light overlay background
2. **MAVYRET logo** on the left — large wordmark with "glecaprevir/pibrentasvir" and "100 mg/40 mg tablets" below
3. **Navigation links** on the right side — horizontal, uppercase:
   - "INFORMACIÓN IMPORTANTE DE SEGURIDAD" (plain text, not a dropdown)
   - "INFORMACIÓN COMPLETA PARA LA PRESCRIPCIÓN ▼" (dropdown with gray background when open)
   - "INFORMACIÓN PARA PACIENTES ▼" (dropdown)
4. **Dropdown** panel has light gray background with two sub-links
5. **Text color**: Dark gray/black for nav items, no orange
6. **Font**: Uppercase, medium weight, ~14-16px
7. **Header position**: Fixed/sticky at top
8. **No hamburger visible** in desktop view (mobile only)

## Current State vs. Target

| Aspect | Current CSS | Target (live site) |
|--------|-------------|-------------------|
| Background | White (`var(--background-color)`) | Semi-transparent or white |
| Position | Fixed on mobile, relative on desktop | Should be fixed/sticky on all sizes |
| Logo size | 128px width | Larger (~200-250px) to match the MAVYRET wordmark |
| Nav font size | `var(--body-font-size-s)` | ~14px, uppercase |
| Nav text color | `currentcolor` | Dark gray (#4a4a4a) |
| Dropdown background | `var(--light-color)` | Light gray with border |
| Dropdown position | Absolute, 200px wide | Absolute below item, wider to fit content |
| Dropdown arrow | CSS triangle | ▼ dropdown indicator |
| Nav gap | 24px | Tighter, ~16-20px |
| Max-width | 1264px | Wider/full-width with padding |

## Key Changes Needed

1. **Logo**: Increase width from 128px to ~220px
2. **Nav items**: Uppercase text, smaller font (~14px), tighter spacing
3. **Header**: Keep white background, could add subtle border-bottom or shadow
4. **Dropdown**: Wider panel, gray background, proper positioning below link
5. **Dropdown indicator**: Style the `::after` arrow to look like a down-arrow (▼)
6. **Alignment**: Logo left, nav items right-aligned

## Files to Modify

| File | Change |
|------|--------|
| `blocks/header/header.css` | Update styles to match live site design |

## Checklist

- [ ] Increase logo width from 128px to ~220px
- [ ] Make nav items uppercase with smaller font size (~14px)
- [ ] Adjust nav spacing/gap to be tighter
- [ ] Style dropdown panel: wider, light gray background, proper border
- [ ] Fix dropdown arrow/indicator styling
- [ ] Ensure header stays fixed/sticky on desktop
- [ ] Add subtle bottom border or shadow to header
- [ ] Verify responsive: hamburger on mobile, horizontal nav on desktop
- [ ] Run `npm run lint:css`
- [ ] Visual comparison against live screenshot

---

*This plan requires Execute mode to proceed with implementation.*
