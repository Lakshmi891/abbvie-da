/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-costos-page.js
  var import_costos_page_exports = {};
  __export(import_costos_page_exports, {
    default: () => import_costos_page_default
  });

  // tools/importer/parsers/hero-pharma.js
  function parse(element, { document }) {
    let bgImage = element.querySelector(".abbv-background-container-display img, .abbv-background-container-image-bg img");
    if (!bgImage) {
      const bgDisplay = element.querySelector(".abbv-background-container-display, .abbv-background-container-image-bg");
      if (bgDisplay) {
        const style = bgDisplay.getAttribute("style") || "";
        const match = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
        if (match) {
          bgImage = document.createElement("img");
          bgImage.src = match[1];
          bgImage.alt = "";
        }
      }
    }
    const heading = element.querySelector(".pr-cost-bg-green h1, .abbv-rich-text h1, .abbv-background-container-content h1, h1, h2");
    const description = element.querySelector(".pr-cost-bg-green p, .abbv-rich-text p, .abbv-background-container-content p, p");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-pharma", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-cta-banner.js
  function parse2(element, { document }) {
    const col1Content = [];
    const image = element.querySelector(".abbv-flex-item .image-text-v2 img, .abbv-flex-item .abbv-image-content-container-v2 img");
    if (image) {
      col1Content.push(image);
    }
    const ctaButton = element.querySelector(".abbv-flex-item .cta a, .abbv-flex-item a.abbv-button-primary");
    if (ctaButton) {
      col1Content.push(ctaButton);
    }
    const col2Content = [];
    const flexItems = element.querySelectorAll(".abbv-flex-item");
    if (flexItems.length > 1) {
      const secondFlexItem = flexItems[1];
      const richTextContainer = secondFlexItem.querySelector(".abbv-rich-text, .rich-text");
      if (richTextContainer) {
        const paragraphs = richTextContainer.querySelectorAll(":scope > p, :scope > .abbv-rich-text > p");
        paragraphs.forEach((p) => {
          col2Content.push(p);
        });
      }
    }
    const cells = [
      [col1Content, col2Content]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-cta-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/table-highlight.js
  function parse3(element, { document }) {
    const row = element.querySelector("tr");
    const cells = [];
    if (row) {
      const tds = row.querySelectorAll("td");
      const labelCell = tds[0];
      const valueCell = tds[1];
      const rowCells = [];
      if (labelCell) rowCells.push(labelCell);
      if (valueCell) rowCells.push(valueCell);
      if (rowCells.length > 0) {
        cells.push(rowCells);
      }
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "table-highlight", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/table-insurance.js
  function parse4(element, { document }) {
    const rows = element.querySelectorAll("tr");
    const cells = [];
    rows.forEach((row) => {
      const tds = row.querySelectorAll("td, th");
      if (tds.length >= 2) {
        const cell1 = document.createElement("div");
        cell1.innerHTML = tds[0].innerHTML.trim();
        const cell2 = document.createElement("div");
        cell2.innerHTML = tds[1].innerHTML.trim();
        cells.push([cell1, cell2]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "table-insurance", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/mavyret-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".abbv-modal",
        ".abbv-dimmer"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#onetrust-banner-sdk",
        ".onetrust-pc-dark-filter",
        "#ot-sdk-btn-floating",
        '[id^="ot-"]',
        ".ot-sdk-container"
      ]);
      const emptyNewpars = element.querySelectorAll(".newpar.new.section");
      emptyNewpars.forEach((el) => {
        if (el.children.length === 0) el.remove();
      });
      const emptyPars = element.querySelectorAll(".par.iparys_inherited");
      emptyPars.forEach((el) => {
        if (el.children.length === 0) el.remove();
      });
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".abbv-header",
        ".abbv-header-utility-navigation"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".abbv-footer",
        ".footer.parbase"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".abbv-safety-bar"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".abbv-back-to-top"
      ]);
      const clearDivs = element.querySelectorAll(".abbv-clear");
      clearDivs.forEach((el) => {
        if (el.children.length === 0 && el.textContent.trim() === "") el.remove();
      });
      WebImporter.DOMUtils.remove(element, ["noscript", "link"]);
    }
  }

  // tools/importer/transformers/mavyret-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const doc = element.ownerDocument || document;
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (i > 0) {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
      }
    }
  }

  // tools/importer/import-costos-page.js
  var parsers = {
    "hero-pharma": parse,
    "columns-cta-banner": parse2,
    "table-highlight": parse3,
    "table-insurance": parse4
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "costos-page",
    description: "MAVYRET cost information page with hero section, CTA banner for AbbVie Contigo enrollment, insurance cost breakdown grid, and ISI safety information section. Spanish language.",
    urls: ["https://www.mavyretpr.com/costos"],
    blocks: [
      {
        name: "hero-pharma",
        instances: ["#background-container-1945835351"]
      },
      {
        name: "columns-cta-banner",
        instances: [".abbv-row-container.pr-cost-CAM.mavy-csto-seguro-medico-top"]
      },
      {
        name: "table-highlight",
        instances: ["table.pr-cost-light-green-table"]
      },
      {
        name: "table-insurance",
        instances: ["table.pr-cost-center-table"]
      }
    ],
    sections: [
      {
        id: "section-hero",
        name: "Hero",
        selector: "#background-container-1945835351",
        style: null,
        blocks: ["hero-pharma"],
        defaultContent: []
      },
      {
        id: "section-cta-wac",
        name: "AbbVie Contigo Program Banner + WAC Cost",
        selector: ".abbv-row-container.pr-cost-CAM.mavy-csto-seguro-medico-top",
        style: null,
        blocks: ["columns-cta-banner", "table-highlight"],
        defaultContent: []
      },
      {
        id: "section-insurance",
        name: "Insurance Cost Breakdown",
        selector: ".abbv-row-container.mavy-csto-seguro-medico",
        style: null,
        blocks: ["table-insurance"],
        defaultContent: [".pr-cost-h1", ".pr-cost-h3", ".pr-cost-text-indent"]
      },
      {
        id: "section-isi",
        name: "ISI (Important Safety Information)",
        selector: ".abbv-inline-use-isi",
        style: null,
        blocks: [],
        defaultContent: [".abbv-isi-content"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_costos_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_costos_page_exports);
})();
