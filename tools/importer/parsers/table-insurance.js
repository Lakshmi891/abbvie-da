/* eslint-disable */
/* global WebImporter */

/**
 * Parser for table-insurance
 * Base block: table
 * Source selector: table.pr-cost-center-table
 * Generated: 2026-05-20
 *
 * Extracts a bordered insurance cost table with header row and data rows.
 * Each row has two columns: insurance type (label) and cost details (value).
 * Preserves inline formatting (bold, superscript, line breaks, links).
 */
export default function parse(element, { document }) {
  // Extract all rows from the source table
  const rows = element.querySelectorAll('tr');

  // Build cells array matching the Table (bordered) block library structure
  // Each row in the source becomes a row (2-cell array) in the block
  const cells = [];

  rows.forEach((row) => {
    const tds = row.querySelectorAll('td, th');
    if (tds.length >= 2) {
      // Create containers for each cell to preserve inline HTML (bold, sup, br, links)
      const cell1 = document.createElement('div');
      cell1.innerHTML = tds[0].innerHTML.trim();

      const cell2 = document.createElement('div');
      cell2.innerHTML = tds[1].innerHTML.trim();

      cells.push([cell1, cell2]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-insurance', cells });
  element.replaceWith(block);
}
