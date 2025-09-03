import { App } from '../App.js';
import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('my-app', () => {
  test('is defined', () => {
    const el = document.createElement('my-app');
    assert.instanceOf(el, App);
  });

  test('renders a nav-bar and a router outlet', async () => {
    const el = await fixture(html`<my-app></my-app>`);
    await el.updateComplete;
    const navBar = el.shadowRoot.querySelector('nav-bar');
    const routerOutlet = el.shadowRoot.querySelector('#router-outlet');
    assert.isNotNull(navBar, 'nav-bar should not be null');
    assert.isNotNull(routerOutlet, 'router-outlet should not be null');
  });

  test('updates currentPath on vaadin-router-location-changed event', async () => {
    const el = await fixture(html`<my-app></my-app>`);
    const newPath = '/add-employee';
    const event = new CustomEvent('vaadin-router-location-changed', {
      detail: {
        location: {
          pathname: newPath,
        },
      },
    });
    window.dispatchEvent(event);
    await el.updateComplete;
    assert.equal(el.currentPath, newPath, `currentPath should be updated to "${newPath}"`);
  });
});