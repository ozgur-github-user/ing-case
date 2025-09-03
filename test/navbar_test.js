import { html, fixture, assert } from '@open-wc/testing';
import '../../src/components/navBar/navbar.js';

suite('nav-bar', () => {
  let el;

  setup(async () => {
    el = await fixture(html`<nav-bar .currentPath=${'/'}></nav-bar>`);
    await el.updateComplete;
  });

  teardown(() => {
    document.documentElement.lang = 'en';
  });

  test('is defined', () => {
    assert.instanceOf(el, customElements.get('nav-bar'));
  });

  test('renders logo and navigation links', () => {
    const logo = el.shadowRoot.querySelector('.nav-left img');
    const navLinks = el.shadowRoot.querySelectorAll('.navigate');
    assert.isNotNull(logo, 'Logo should be rendered');
    assert.equal(navLinks.length, 2, 'There should be two navigation links');
  });

  test('renders link text with default (en) locale', () => {
    const navLinks = el.shadowRoot.querySelectorAll('.navigate span');
    assert.equal(navLinks[0].textContent, 'Employees');
    assert.equal(navLinks[1].textContent, 'Add New');
  });

  test('renders correct flag and text for \'tr\' locale', async () => {
    document.documentElement.lang = 'tr';
    el = await fixture(html`<nav-bar .currentPath=${'/'}></nav-bar>`);
    await el.updateComplete;

    const navLinks = el.shadowRoot.querySelectorAll('.navigate span');
    assert.equal(navLinks[0].textContent, 'Çalışanlar');
    assert.equal(navLinks[1].textContent, 'Yeni Ekle');

    const flagImg = el.shadowRoot.querySelector('.flags img');
    assert.include(flagImg.src, 'turkish.svg');
  });
});
