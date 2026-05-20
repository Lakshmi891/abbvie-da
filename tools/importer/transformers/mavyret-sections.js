/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: MAVYRET section breaks.
 * Inserts <hr> elements between template sections to create AEM section boundaries.
 * Processes sections in reverse order to preserve DOM positions.
 * All selectors verified in migration-work/cleaned.html
 *
 * Sections (from page-templates.json):
 *   1. section-hero: #background-container-1945835351
 *   2. section-cta-wac: .abbv-row-container.pr-cost-CAM.mavy-csto-seguro-medico-top
 *   3. section-insurance: .abbv-row-container.mavy-csto-seguro-medico
 *   4. section-isi: .abbv-inline-use-isi
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const doc = element.ownerDocument || document;

    // Get sections from template payload
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);

      if (!sectionEl) continue;

      // Insert <hr> before each non-first section to create section break
      if (i > 0) {
        const hr = doc.createElement('hr');
        sectionEl.before(hr);
      }

      // Insert Section Metadata block after section content if style is defined
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metaBlock);
      }
    }
  }
}
