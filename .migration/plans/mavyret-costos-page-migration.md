# Footer Styling Plan — MAVYRET Costos

## Overview
Style the shared footer (`blocks/footer/footer.css`) to match the MAVYRET costos page screenshot. This modifies the global footer CSS directly, affecting all pages.

## Screenshot Analysis

From the provided screenshot, the footer has these visual characteristics:

1. **Navigation links row** (top)
   - Orange/amber colored uppercase text links
   - Centered, horizontal layout with spacing between items
   - Wraps to second line on narrower widths
   - Font appears to be bold/medium weight, all-caps

2. **Divider line**
   - Thin horizontal line (dark/black) separating nav from content

3. **Legal/disclaimer text** (middle)
   - Dark gray/black body text, centered alignment
   - "haga clic aquí" link in orange color
   - Normal paragraph weight, smaller font size

4. **Copyright line**
   - "©2024 AbbVie Inc. North Chicago, IL 60064 US-MAVY-260051"
   - Centered, same font size as disclaimer
   - Below that: "contáctenos" link in orange

5. **AbbVie logo** (bottom-right)
   - Dark navy AbbVie wordmark, aligned to the right

## Current Footer Content Structure

The `content/footer.plain.html` has:
- **Section 1** (`<div>`): `<ul>` with navigation links (AbbVie, Declaración de accesibilidad, Contáctenos, etc.)
- **Section 2** (`<div>`): Disclaimer `<p>`, copyright `<p>`, AbbVie logo `<picture>`

## CSS Changes Required

Modify `blocks/footer/footer.css` to implement:

| Element | Style |
|---------|-------|
| Background | White (not light-color) |
| Nav links (`ul`) | Centered, horizontal flex-wrap, orange color (#c35a11 or similar), uppercase, bold |
| Divider | Border-bottom on nav section or `<hr>` styling |
| Disclaimer text | Centered, max-width for readability, standard body size |
| Links within text | Orange color matching nav links |
| Copyright text | Centered |
| Logo (picture/img) | Right-aligned, contained size |

## Brand Colors (from screenshot)
- Link color (orange/amber): approximately `#c05a10` or `#d4760a`
- Text: `#333` or `#131313` (existing `--text-color`)
- Background: white
- Divider line: dark (black or near-black)

## Files to Modify

| File | Change |
|------|--------|
| `blocks/footer/footer.css` | Complete restyle to match screenshot |

## Checklist

- [ ] Extract exact brand orange color from the live site for link styling
- [ ] Update `blocks/footer/footer.css` with new styles:
  - [ ] White background
  - [ ] Navigation links: centered, flex-wrap, orange, uppercase, bold
  - [ ] Divider line between nav and content
  - [ ] Centered disclaimer/legal text
  - [ ] Orange link color for inline links
  - [ ] Right-aligned AbbVie logo at bottom
- [ ] Verify footer renders correctly in local preview
- [ ] Run `npm run lint` (CSS linting)
- [ ] Responsive check: links wrap properly on mobile

---

*This plan requires Execute mode to proceed with implementation.*
