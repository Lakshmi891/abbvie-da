/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-pharma
 * Base block: hero
 * Source: https://www.mavyretpr.com/costos
 * Selector: #background-container-1945835351
 * Generated: 2026-05-20
 *
 * Extracts background image, heading, and paragraph from the AbbVie
 * background-container hero pattern with green overlay text area.
 * Background image may be an <img> element or a CSS background-image on the display container.
 */
export default function parse(element, { document }) {
  // Extract background image - try <img> element first, then CSS background-image
  let bgImage = element.querySelector('.abbv-background-container-display img, .abbv-background-container-image-bg img');

  if (!bgImage) {
    // Background image applied via CSS style attribute on the display container
    const bgDisplay = element.querySelector('.abbv-background-container-display, .abbv-background-container-image-bg');
    if (bgDisplay) {
      const style = bgDisplay.getAttribute('style') || '';
      const match = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
      if (match) {
        bgImage = document.createElement('img');
        bgImage.src = match[1];
        bgImage.alt = '';
      }
    }
  }

  // Extract heading from the green overlay content area
  const heading = element.querySelector('.pr-cost-bg-green h1, .abbv-rich-text h1, .abbv-background-container-content h1, h1, h2');

  // Extract description paragraph from the green overlay content area
  const description = element.querySelector('.pr-cost-bg-green p, .abbv-rich-text p, .abbv-background-container-content p, p');

  // Build cells to match block library example:
  // Row 1: Background image
  // Row 2: Heading
  // Row 3: Description paragraph
  const cells = [];

  if (bgImage) {
    cells.push([bgImage]);
  }

  if (heading) {
    cells.push([heading]);
  }

  if (description) {
    cells.push([description]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-pharma', cells });
  element.replaceWith(block);
}
