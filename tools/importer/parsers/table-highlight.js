/* eslint-disable */
/* global WebImporter */

/**
 * Parser for table-highlight
 * Base block: table
 * Source: https://www.mavyretpr.com/costos
 * Selector: table.pr-cost-light-green-table
 * Generated: 2026-05-20
 *
 * Extracts a single-row table with label-value pair (WAC cost info)
 * and produces a Table (highlight) block with no header row.
 */
export default function parse(element, { document }) {
  // Extract the table row cells from the source table
  const row = element.querySelector('tr');
  const cells = [];

  if (row) {
    const tds = row.querySelectorAll('td');
    const labelCell = tds[0];
    const valueCell = tds[1];

    // Build the content row: [label, value]
    const rowCells = [];
    if (labelCell) rowCells.push(labelCell);
    if (valueCell) rowCells.push(valueCell);

    if (rowCells.length > 0) {
      cells.push(rowCells);
    }
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-highlight', cells });
  element.replaceWith(block);
}
