import { html, fixture, assert } from '@open-wc/testing';
import '../../src/components/pagination/pagination.js';

suite('pagination-component', () => {
  let el;

  setup(async () => {
    el = await fixture(html`<pagination-component></pagination-component>`);
    await el.updateComplete;
  });

  test('is defined', () => {
    assert.instanceOf(el, customElements.get('pagination-component'));
  });

  test('renders with default properties', () => {
    assert.equal(el.totalPages, 7);
    assert.equal(el.currentPage, 1);
  });

  suite('_getPagination logic', () => {
    test('handles totalPages <= 7', () => {
      el.totalPages = 5;
      const pagination = el._getPagination();
      assert.deepEqual(pagination, [1, 2, 3, 4, 5]);
    });

    test('handles currentPage near the beginning', () => {
      el.totalPages = 20;
      el.currentPage = 3;
      const pagination = el._getPagination();
      assert.deepEqual(pagination, [1, 2, 3, 4, 5, '...', 20]);
    });

    test('handles currentPage near the end', () => {
      el.totalPages = 20;
      el.currentPage = 18;
      const pagination = el._getPagination();
      assert.deepEqual(pagination, [1, '...', 16, 17, 18, 19, 20]);
    });

    test('handles currentPage in the middle', () => {
      el.totalPages = 20;
      el.currentPage = 10;
      const pagination = el._getPagination();
      assert.deepEqual(pagination, [1, '...', 9, 10, 11, '...', 20]);
    });
  });

  test('increments page on next button click', async () => {
    let eventFired = false;
    el.totalPages = 10;
    el.currentPage = 5;
    await el.updateComplete;

    el.addEventListener('page-changed', () => { eventFired = true; });

    const nextButton = el.shadowRoot.querySelectorAll('.nav-button')[1];
    nextButton.click();

    assert.isTrue(eventFired);
    assert.equal(el.currentPage, 6);
  });

  test('decrements page on previous button click', async () => {
    let eventFired = false;
    el.totalPages = 10;
    el.currentPage = 5;
    await el.updateComplete;

    el.addEventListener('page-changed', () => { eventFired = true; });

    const prevButton = el.shadowRoot.querySelector('.nav-button');
    prevButton.click();

    assert.isTrue(eventFired);
    assert.equal(el.currentPage, 4);
  });

  test('does not go below page 1', async () => {
    let eventFired = false;
    el.currentPage = 1;
    await el.updateComplete;
    el.addEventListener('page-changed', () => { eventFired = true; });

    const prevButton = el.shadowRoot.querySelector('.nav-button');
    prevButton.click();

    assert.isFalse(eventFired);
    assert.equal(el.currentPage, 1);
  });

  test('does not go above totalPages', async () => {
    let eventFired = false;
    el.totalPages = 10;
    el.currentPage = 10;
    await el.updateComplete;
    el.addEventListener('page-changed', () => { eventFired = true; });

    const nextButton = el.shadowRoot.querySelectorAll('.nav-button')[1];
    nextButton.click();

    assert.isFalse(eventFired);
    assert.equal(el.currentPage, 10);
  });
});
