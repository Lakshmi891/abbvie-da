/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-cta-banner
 * Base block: columns
 * Source: https://www.mavyretpr.com/costos
 * Selector: .abbv-row-container.pr-cost-CAM.mavy-csto-seguro-medico-top
 * Description: Side-by-side CTA banner with program logos + button in column 1,
 *              and rich text content (heading, links, description) in column 2.
 */
export default function parse(element, { document }) {
  // Column 1: Image + CTA button
  const col1Content = [];

  // Extract the program logos image from the first flex item
  const image = element.querySelector('.abbv-flex-item .image-text-v2 img, .abbv-flex-item .abbv-image-content-container-v2 img');
  if (image) {
    col1Content.push(image);
  }

  // Extract the CTA button link from the first flex item
  const ctaButton = element.querySelector('.abbv-flex-item .cta a, .abbv-flex-item a.abbv-button-primary');
  if (ctaButton) {
    col1Content.push(ctaButton);
  }

  // Column 2: Rich text content (heading, links, descriptive paragraphs)
  const col2Content = [];

  // Get the second flex item's rich text container
  const flexItems = element.querySelectorAll('.abbv-flex-item');
  if (flexItems.length > 1) {
    const secondFlexItem = flexItems[1];
    const richTextContainer = secondFlexItem.querySelector('.abbv-rich-text, .rich-text');
    if (richTextContainer) {
      // Extract all paragraph elements from the rich text
      const paragraphs = richTextContainer.querySelectorAll(':scope > p, :scope > .abbv-rich-text > p');
      paragraphs.forEach((p) => {
        col2Content.push(p);
      });
    }
  }

  // Build cells array matching the Columns block structure:
  // Row 1: Column 1 | Column 2
  const cells = [
    [col1Content, col2Content],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta-banner', cells });
  element.replaceWith(block);
}
