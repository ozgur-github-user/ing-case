import { LitElement, html } from 'lit';
import styles from './search-styles.js';

import en from '../../locales/en.js';
import tr from '../../locales/tr.js';

const translations = {
  en,
  tr
};

export class Search extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      searchTerm: { type: String },
      locale: { type: Object },
    };
  }

  constructor() {
    super();
    this.searchTerm = '';
    const lang = document.documentElement.lang || 'en';
    this.locale = translations[lang];
  }

  render() {
    return html`
      <div class="search-container">
        <input type="text" .value=${this.searchTerm} @input=${this.handleSearch} placeholder="${this.locale.employeeListPage.searchEmployees}">
      </div>
    `;
  }

  handleSearch(e) {
    this.searchTerm = e.target.value;
    this.dispatchEvent(new CustomEvent('search', { detail: this.searchTerm }));
  }
}

customElements.define('search-component', Search);