# Footer Styling Fix — Logo Not Displaying

## Overview
The AbbVie logo is not displaying in the footer despite being present in the HTML content and having CSS rules to show it.

## Root Cause Analysis

Looking at the CSS (line 68-71):
```css
footer .footer .section:last-of-type p:last-child {
  margin: 0;
  display: none;
}
```

And the HTML content structure of the second section (from `content/footer.plain.html`):
```
<p>disclaimer text...</p>
<p>copyright text...</p>
<picture>...<img>...</picture>
<p><br></p>             ← This is the LAST <p>, hidden with display:none
```

The `<picture>` element sits between the copyright `<p>` and the trailing empty `<p>`. The `p:last-child` rule correctly targets only the empty `<p><br></p>` — it should NOT hide the logo.

**However**, the issue may be that the `<picture>` element is being rendered inside the AEM section wrapper differently. In the rendered DOM, the structure becomes:
```
.section:last-of-type > div >
  p (disclaimer)
  p (copyright)
  picture (logo)        ← NOT a <p>, so p:last-child doesn't match the picture
  p (empty br)          ← This IS the last <p> child, hidden
```

Wait — the `picture` element comes AFTER the last `<p>` in the source HTML. But `p:last-child` selects the last child that is a `<p>` — NO. `:last-child` selects an element only if it is the last child of its parent, regardless of type. So `p:last-child` means "a `<p>` that is the last child of its parent."

In the rendered DOM:
- The trailing `<p><br></p>` IS the last child of the container div
- So `p:last-child` matches it and hides it ✅

But wait — the `<picture>` element is BEFORE that trailing `<p>`. So the picture should be visible. Unless the picture is being wrapped in a `<p>` by the AEM decorator (since inline images often get wrapped in `<p>` tags during decoration).

**Most likely cause:** The AEM decoration or fragment loading is wrapping the `<picture>` inside a `<p>` tag, making it a `<p>` child. If that wrapped `<p>` becomes the last `<p>` child... it would be hidden by our `display: none` rule.

**Fix:** Change the selector from `p:last-child` to target the specific empty trailing paragraph more precisely, without accidentally hiding the picture wrapper.

## Fix

Replace:
```css
footer .footer .section:last-of-type p:last-child {
  margin: 0;
  display: none;
}
```

With:
```css
footer .footer .section:last-of-type p:empty,
footer .footer .section:last-of-type p:last-child:not(:has(picture)):not(:has(img)) {
  margin: 0;
  display: none;
}
```

Or simpler — just target empty paragraphs (the `<p><br></p>` only contains a `<br>`):
```css
footer .footer .section:last-of-type > div > p:last-child {
  margin: 0;
  display: none;
}
```

The safest fix is to only hide `<p>` elements that don't contain meaningful content (no images, no text).

## Checklist

- [ ] Fix `p:last-child` selector to not accidentally hide the picture/logo wrapper
- [ ] Verify logo displays correctly after fix
- [ ] Run `npm run lint:css`
- [ ] Visual comparison

---

*This plan requires Execute mode to proceed with implementation.*
