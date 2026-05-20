/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroPharmaParser from './parsers/hero-pharma.js';
import columnsCtaBannerParser from './parsers/columns-cta-banner.js';
import tableHighlightParser from './parsers/table-highlight.js';
import tableInsuranceParser from './parsers/table-insurance.js';

// TRANSFORMER IMPORTS
import mavyretCleanupTransformer from './transformers/mavyret-cleanup.js';
import mavyretSectionsTransformer from './transformers/mavyret-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-pharma': heroPharmaParser,
  'columns-cta-banner': columnsCtaBannerParser,
  'table-highlight': tableHighlightParser,
  'table-insurance': tableInsuranceParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  mavyretCleanupTransformer,
  mavyretSectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'costos-page',
  description: 'MAVYRET cost information page with hero section, CTA banner for AbbVie Contigo enrollment, insurance cost breakdown grid, and ISI safety information section. Spanish language.',
  urls: ['https://www.mavyretpr.com/costos'],
  blocks: [
    {
      name: 'hero-pharma',
      instances: ['#background-container-1945835351'],
    },
    {
      name: 'columns-cta-banner',
      instances: ['.abbv-row-container.pr-cost-CAM.mavy-csto-seguro-medico-top'],
    },
    {
      name: 'table-highlight',
      instances: ['table.pr-cost-light-green-table'],
    },
    {
      name: 'table-insurance',
      instances: ['table.pr-cost-center-table'],
    },
  ],
  sections: [
    {
      id: 'section-hero',
      name: 'Hero',
      selector: '#background-container-1945835351',
      style: null,
      blocks: ['hero-pharma'],
      defaultContent: [],
    },
    {
      id: 'section-cta-wac',
      name: 'AbbVie Contigo Program Banner + WAC Cost',
      selector: '.abbv-row-container.pr-cost-CAM.mavy-csto-seguro-medico-top',
      style: null,
      blocks: ['columns-cta-banner', 'table-highlight'],
      defaultContent: [],
    },
    {
      id: 'section-insurance',
      name: 'Insurance Cost Breakdown',
      selector: '.abbv-row-container.mavy-csto-seguro-medico',
      style: null,
      blocks: ['table-insurance'],
      defaultContent: ['.pr-cost-h1', '.pr-cost-h3', '.pr-cost-text-indent'],
    },
    {
      id: 'section-isi',
      name: 'ISI (Important Safety Information)',
      selector: '.abbv-inline-use-isi',
      style: null,
      blocks: [],
      defaultContent: ['.abbv-isi-content'],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
