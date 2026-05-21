# Table Insurance — Fix Heading Spacing

## Overview
The 40px font-size style for the paragraph above the table is also being applied to paragraphs BELOW the table (the footnotes text). The rule `.table-insurance-wrapper ~ .default-content-wrapper p` targets ALL `.default-content-wrapper p` elements that come AFTER the table wrapper — which includes the footnote paragraphs below.

## Issue
The CSS selector `.table-insurance-wrapper ~ .default-content-wrapper p` uses the general sibling combinator (`~`), which matches ALL following siblings. This means paragraphs in the footnotes section below the table also get the 40px font-size applied.

## Fix
- Keep only the `:has(+ .table-insurance-wrapper)` selector (targets the default-content-wrapper that immediately PRECEDES the table-insurance-wrapper)
- Remove the `~ .default-content-wrapper` selector (which incorrectly targets content AFTER the table too)
- Change `margin-bottom: 24px` to `margin-top: 40px; margin-bottom: 0` so spacing is only above

## Checklist
- [ ] Remove `.table-insurance-wrapper ~ .default-content-wrapper p` selector
- [ ] Keep only `.default-content-wrapper:has(+ .table-insurance-wrapper) p`
- [ ] Change margin to `margin-top` only (not `margin-bottom`)
- [ ] Run `npm run lint:css`
- [ ] Verify footnotes below table render at normal font size

---

*This plan requires Execute mode to proceed with implementation.*
