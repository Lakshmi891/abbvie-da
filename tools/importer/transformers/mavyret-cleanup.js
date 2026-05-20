/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: MAVYRET site cleanup.
 * Removes non-authorable content (header, footer, modals, safety bar, etc.)
 * All selectors verified in migration-work/cleaned.html
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove modal overlays that could interfere with block parsing
    WebImporter.DOMUtils.remove(element, [
      '.abbv-modal',
      '.abbv-dimmer',
    ]);

    // Remove OneTrust cookie consent banner (injected dynamically)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '.onetrust-pc-dark-filter',
      '#ot-sdk-btn-floating',
      '[id^="ot-"]',
      '.ot-sdk-container',
    ]);

    // Remove empty structural divs that add no content
    // Found in cleaned.html: <div class="newpar new section"></div>
    // Found in cleaned.html: <div class="par iparys_inherited"></div>
    const emptyNewpars = element.querySelectorAll('.newpar.new.section');
    emptyNewpars.forEach((el) => {
      if (el.children.length === 0) el.remove();
    });
    const emptyPars = element.querySelectorAll('.par.iparys_inherited');
    emptyPars.forEach((el) => {
      if (el.children.length === 0) el.remove();
    });
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove header/navigation (non-authorable site chrome)
    // Found in cleaned.html: <header class="abbv-header">
    // Found in cleaned.html: <div class="abbv-header-utility-navigation ...">
    WebImporter.DOMUtils.remove(element, [
      '.abbv-header',
      '.abbv-header-utility-navigation',
    ]);

    // Remove footer (non-authorable site chrome)
    // Found in cleaned.html: <footer class="abbv-footer pr-cost-footer-container">
    // Found in cleaned.html: <div class="footer parbase">
    WebImporter.DOMUtils.remove(element, [
      '.abbv-footer',
      '.footer.parbase',
    ]);

    // Remove sticky safety bar (duplicates ISI content, non-authorable widget)
    // Found in cleaned.html: <div class="abbv-safety-bar abbv-isi-content">
    WebImporter.DOMUtils.remove(element, [
      '.abbv-safety-bar',
    ]);

    // Remove back-to-top button (non-authorable UI widget)
    // Found in cleaned.html: <button class="abbv-back-to-top ...">
    WebImporter.DOMUtils.remove(element, [
      '.abbv-back-to-top',
    ]);

    // Remove empty .abbv-clear divs (spacer elements, no content)
    // Found in cleaned.html: <div class="abbv-clear"></div>
    const clearDivs = element.querySelectorAll('.abbv-clear');
    clearDivs.forEach((el) => {
      if (el.children.length === 0 && el.textContent.trim() === '') el.remove();
    });

    // Remove leftover noscript and link tags
    WebImporter.DOMUtils.remove(element, ['noscript', 'link']);
  }
}
