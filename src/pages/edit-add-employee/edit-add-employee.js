import { LitElement, html } from 'lit';
import styles from './edit-add-employee-styles.js';
import { employeeStore } from '../../store/EmployeeStore.js';
import '../../components/add-employee/add-employee.js';
import { Router } from '@vaadin/router';
import '../../components/confirm-modal/confirm-modal.js';
import sharedStyles from '../../styles/shared-styles.js'
import en from '../../locales/en.js';
import tr from '../../locales/tr.js';

const translations = {
  en,
  tr
};

export class EditEmployeePage extends LitElement {
  static get styles() {
      return [sharedStyles, styles];
  }
  
  static get properties() {
    return {
      location: { type: Object },
      showConfirmModal: { type: Boolean },
      locale: { type: Object },
      actionType: { type: String },
    };
  }

  constructor() {
    super();
    this.employee = null;
    this.newEmployee = null;
    const lang = document.documentElement.lang || 'en';
    this.locale = translations[lang];
  }

  connectedCallback() {
    super.connectedCallback();
    const employeeId = parseInt(this.location.params.id, 10);
    this.employee = employeeStore.getEmployeeById(employeeId);

  }

  render() {
    const message = (this.employee) ? this.locale.common.editing
      .replace('{name}', `${this.employee.first_name} ${this.employee.last_name}`) : '';
    
    return html`
      <div class="edit-employee-page-container">
        <div class="heading">
           <p>${this.employee ? this.locale.editEmployeePage.editEmployee : this.locale.addEmployeePage.addEmployee}</p>
        </div>
        <p class="edit-info">${message}</p>
        ${this.employee
        ? html`
          <div class="add-employee-container">
            <add-employee
              .employee=${this.employee}
              @open-confirm-modal=${this.openConfirmModal}
              @form-canceled=${this.onFormCanceled}
            ></add-employee>
          </div>`
        : html` 
          <div class="add-employee-container">
            <add-employee
              .employee=${this.employee}
              @open-confirm-modal=${this.openConfirmModal}
              @form-canceled=${this.onFormCanceled}
            ></add-employee>
          </div>`}

        ${this.showConfirmModal ? html`
          <confirm-modal
            .employee=${this.newEmployee}
            .actionType=${this.employee ? 'edit' : 'add'}
            @confirm-edit=${this.onEmployeeEdit}
            @confirm-add=${this.onEmployeeSaved}
            @cancel=${this.closeConfirmModal}
          ></confirm-modal>
        `: ''}
      </div>
    `;
  }

  onEmployeeEdit() {
    employeeStore.editEmployee(this.newEmployee);
    this.closeConfirmModal();
    Router.go('/');
  }


  onEmployeeSaved() {
    employeeStore.addEmployee(this.newEmployee);
    this.closeConfirmModal();
    Router.go('/');
    
  }

  openConfirmModal(event) {
    event.preventDefault();
    this.showConfirmModal = true;
    this.newEmployee = event.detail;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
  }

  onFormCanceled() {
    Router.go('/');
  }
}

customElements.define('edit-employee-page', EditEmployeePage);