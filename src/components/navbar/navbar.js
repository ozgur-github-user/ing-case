import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import styles from './navbar-styles.js';

import en from '../../locales/en.js';
import tr from '../../locales/tr.js';

const translations = {
  en,
  tr
};

export class NavBar extends LitElement {
  static get properties() {
    return {
      currentPath: { type: String },
      locale: { type: Object },
    };
  }

  constructor() {
    super();
    const lang = document.documentElement.lang || 'en';
    this.locale = translations[lang];
  }

  static get styles() {
    return styles;
  }

  render() {
    const lang = document.documentElement.getAttribute('lang') || 'en';
    const flag =
      lang === 'tr'
        ? '../../../assets/icon/flags/turkish.svg'
        : '../../../assets/icon/flags/english.svg';

    return html`
      <nav class="navbar">
        <div class="nav-left">
          <img
            src="https://cdn.brandfetch.io/idNsVA30h5/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1676262643700"
          />
          <span class="company-name">ING</span>
        </div>
        <div class="logo">
          
        </div>
        <div class="actions">
          <div
            class="navigate"
            style="opacity: ${this.currentPath === '/' ? '1' : '0.5'}"
            @click=${() => this.navigateTo('/')}
          >
            <img src="../../../assets/icon/users.svg"/>
            <span>${this.locale.navBar.employees}</span>
          </div>
          <div
            class="navigate"
            style="opacity: ${this.currentPath === '/add-employee' ? '1' : '0.5'}"
            @click=${() => this.navigateTo('/add-employee')}
          >
             <img src="../../../assets/icon/plus.svg"/>
            <span>${this.locale.navBar.addNew}</span>
          </div>
          <div class="flags">
            <img src="${flag}"/>
          </div>
        </div>
      </nav>
    `;
  }

  navigateTo(path) {
    Router.go(path);
  }
}

customElements.define('nav-bar', NavBar);
