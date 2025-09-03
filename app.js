import { LitElement, html } from 'lit';
import styles from './app-styles.js';
import './src/components/employee-list-table/employee-list-table.js';
import './src/components/add-employee/add-employee.js';
import './src/components/employee-card-list/employee-card-list.js';
import './src/components/confirm-modal/confirm-modal.js';
import './src/components/pagination/pagination.js'
import './src/pages/employee-list/employee-list.js'
import './src/pages/edit-add-employee/edit-add-employee.js'
import './src/components/navbar/navbar.js'
import { configureLocalization } from '@lit/localize';
import en from './src/locales/en.js';
import tr from './src/locales/tr.js';
import { Router } from '@vaadin/router';
import { routes } from './src/router.js';

const translations = { en, tr };

const { getLocale, setLocale } = configureLocalization({
  sourceLocale: document.documentElement.lang,
  loadLocale: async (locale) => translations[locale],
});

export class App extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      currentLocale: { type: String },
      currentPath: { type: String },
    };
  }

  constructor() {
    super();
    this.currentLocale = getLocale();
    this.currentPath = window.location.pathname;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('vaadin-router-location-changed', (e) => {
      this.currentPath = e.detail.location.pathname;
    });
  }

  firstUpdated() {
    const outlet = this.shadowRoot.querySelector('#router-outlet');
    const router = new Router(outlet);
    router.setRoutes(routes);
  }

  render() {
    return html`
      <div class="app">
        <nav-bar .currentPath=${this.currentPath}></nav-bar>
        <div class="app-body">
          <div id="router-outlet"></div>
        </div>
      </div>
    `;
  }

  async _onLanguageChange(event) {
    const selectedLocale = event.target.value;
    await setLocale(selectedLocale);
    this.currentLocale = selectedLocale;
  }

  _onClick() {
    this.count++;
    this.dispatchEvent(new CustomEvent('count-changed'));
  }
}

window.customElements.define('my-app', App);