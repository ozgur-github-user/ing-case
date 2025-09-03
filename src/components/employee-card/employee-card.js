import { LitElement, html } from 'lit';
import styles from './employee-card-style.js';
import en from '../../locales/en.js';
import tr from '../../locales/tr.js';

const translations = {
  en,
  tr
};

export class EmployeeCard extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      employee: { type: Object },
      locale: { type: Object },
    };
  }

  constructor() {
    super();
    this.employee = {};
    const lang = document.documentElement.lang || 'en';
    this.locale = translations[lang];
  }

  onEdit() {
    this.dispatchEvent(new CustomEvent('edit-employee', { detail: this.employee }));
  }

  onDelete() {
    this.dispatchEvent(new CustomEvent('delete-employee', { detail: this.employee }));
  }

  render() {

    return html`
      <div class="card">
        <div class="column">
          <div class="field">
            <label class="label">${this.locale.common.firstName}</label>
            <p>${this.employee.first_name}</p>
          </div>
          <div class="field">
            <label class="label">${this.locale.common.dateOfEmployment}</label>
            <p>${this.employee.date_of_employment}</p>
          </div>
          <div class="field">
            <label class="label">${this.locale.common.phone}</label>
            <p>${this.employee.phone}</p>
          </div>
          <div class="field">
            <label class="label">${this.locale.common.department}</label>
            <p>${this.employee.department}</p>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">${this.locale.common.lastName}</label>
            <p>${this.employee.last_name}</p>
          </div>
          <div class="field">
            <label class="label">${this.locale.common.dateOfBirth}</label>
            <p>${this.employee.date_of_birth}</p>
          </div>
          <div class="field">
            <label class="label">${this.locale.common.email}</label>
            <p>${this.employee.email}</p>
          </div>
          <div class="field">
            <label class="label">${this.locale.common.position}</label>
            <p>${this.employee.position}</p>
          </div>
        </div>
        <div class="actions">
          <button class="edit-button" @click=${this.onEdit}>
              <img src="../../../assets/icon/edit-card.svg"/>
            ${this.locale.common.edit}</button>
          <button class="delete-button" @click=${this.onDelete}>
            <img src="../../../assets/icon/delete-card.svg"/>
          ${this.locale.common.delete}</button>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-card', EmployeeCard);
