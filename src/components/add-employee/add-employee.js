import { LitElement, html } from 'lit';
import styles from './add-employee-style.js';
import en from '../../locales/en.js';
import tr from '../../locales/tr.js';

const translations = {
  en,
  tr
};

export class AddEmployee extends LitElement {
    static get styles() {
      return styles;
    }

  static get properties() {
    return {
      employee: { type: Object },
      locale: {type: Object}
    };
  }

  constructor() {
    super();
    this.employee = null;
    const lang = document.documentElement.lang || 'en';
    this.locale = translations[lang].common;
  }

  render() {
    const defaultEmployee = {
      first_name: '',
      last_name: '',
      date_of_employment: '',
      date_of_birth: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };

    const formData = this.employee || defaultEmployee;
    
    return html`
      <form class="form-container">
        <div class="form-group">
          <label for="first_name">${this.locale.firstName}</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            .value=${formData.first_name}
          />
        </div>
        <div class="form-group">
          <label for="last_name">${this.locale.lastName}</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            .value=${formData.last_name}
          />
        </div>
        <div class="form-group">
          <label for="date_of_employment">${this.locale.dateOfEmployment}</label>
          <input
            id="date_of_employment"
            name="date_of_employment"
            type="date"
            .value=${this.formatDate(formData.date_of_employment)}
          />
        </div>
        <div class="form-group">
          <label for="date_of_birth">${this.locale.dateOfBirth}</label>
          <input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            .value=${this.formatDate(formData.date_of_birth)}
          />
        </div>
        <div class="form-group">
          <label for="phone">${this.locale.phone}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            .value=${formData.phone}
          />
        </div>
        <div class="form-group">
          <label for="email">${this.locale.email}</label>
          <input
            id="email"
            name="email"
            type="email"
            .value=${formData.email}
          />
        </div>
        <div class="form-group">
          <label for="department">${this.locale.department}</label>
          <input
            id="department"
            name="department"
            type="text"
            .value=${formData.department}
          />
        </div>
        <div class="form-group">
          <label for="position">${this.locale.position}</label>
          <select
            id="position"
            name="position"
            .value=${formData.position}
          >
            <option value="Junior">Junior</option>
            <option value="Medior">Medior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div class="form-actions">
          <button class="save-button" type="button" @click=${this.onSave}>${this.locale.save}</button>
          <button class="cancel-button" type="button" @click=${this.onCancel}>${this.locale.cancel}</button>
        </div>
      </form>
    `;
  }

  formatDate(dateString) {
    if (!dateString) return '';

    let date;
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      return '';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatDateToDDMMYYYY(dateString) {
    if (!dateString || !dateString.includes('-')) {
      return dateString;
    }
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input, select');
    let isFormValid = true;

    inputs.forEach(input => {
      let isValid = true;
      isValid = !!input.value && (input.name !== 'email' || this.validateEmail(input.value));

      input.style.borderColor = isValid ? '' : 'red';

      if (!isValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  onSave(event) {
    event.preventDefault();
    const form = this.shadowRoot.querySelector('form');
    const isFormValid = this.validateForm(form);
    if (!isFormValid) return;

    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());


    if (formValues.date_of_birth) {
      formValues.date_of_birth = this.formatDateToDDMMYYYY(formValues.date_of_birth);
    }
    if (formValues.date_of_employment) {
      formValues.date_of_employment = this.formatDateToDDMMYYYY(formValues.date_of_employment);
    }

    const employeeData = { ...this.employee, ...formValues };
    this.dispatchEvent(new CustomEvent('open-confirm-modal', { detail: employeeData }));
  }

  onCancel() {
    this.dispatchEvent(new CustomEvent('form-canceled'));
  }
}

customElements.define('add-employee', AddEmployee);
