import { LitElement, html } from 'lit';
import styles from './employee-list-table-styles.js';
import { employeeStore } from '../../store/EmployeeStore.js';
import '../pagination/pagination.js';
import '../confirm-modal/confirm-modal.js';
import { Router } from '@vaadin/router';
import en from '../../locales/en.js';
import tr from '../../locales/tr.js';

const translations = {
  en,
  tr
};

export class EmployeeListTable extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      employees: { type: Array },
      currentPage: { type: Number },
      employeeToConfirm: { type: Object },
      confirmType: { type: String },
      locale: { type: Object },
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.currentPage = 1;
    this.employeeToConfirm = null;
    this.confirmType = 'edit';
    const lang = document.documentElement.lang || 'en';
    this.locale = translations[lang];
  }

  render() {
    const itemsPerPage = 10;
    const startIndex = (this.currentPage - 1) * itemsPerPage;
    const paginatedEmployees = this.employees.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(this.employees.length / itemsPerPage);

    return html`
      ${this.employeeToConfirm
        ? html`
            <confirm-modal
              actionType="delete"
              .employee=${this.employeeToConfirm}
              .confirmType=${this.confirmType}
              @confirm-edit=${this.confirmEdit}
              @confirm-delete=${this.confirmDelete}
              @cancel=${this.cancelConfirm}
            ></confirm-modal>
          `
        : ''}
      <table>
        <thead>
          <tr>
            <th><input class="row-checkbox" type="checkbox"  @change=${this.selectAll}></th>
            <th class="fist-name">${this.locale.common.firstName}</th>
            <th class="grey-column">${this.locale.common.lastName}</th>
            <th class="grey-column">${this.locale.common.dateOfEmployment}</th>
            <th class="grey-column">${this.locale.common.dateOfBirth}</th>
            <th class="grey-column">${this.locale.common.phone}</th>
            <th class="grey-column">${this.locale.common.email}</th>
            <th class="lgrey-column">${this.locale.common.department}</th>
            <th class="grey-column">${this.locale.common.position}</th>
            <th class="grey-column">${this.locale.common.actions}</th>
          </tr>
        </thead>
        <tbody>
          ${paginatedEmployees.map(
            (employee) => html`
              <tr>
                <td data-label="${this.locale.common.select}"><input type="checkbox" class="row-checkbox"></td>
                <td data-label="${this.locale.common.firstName}" class="first-name-data">${employee.first_name}</td>
                <td data-label="${this.locale.common.lastName}" class="last-name-data">${employee.last_name}</td>
                <td data-label="${this.locale.common.dateOfEmployment}">${employee.date_of_employment}</td>
                <td data-label="${this.locale.common.dateOfBirth}">${employee.date_of_birth}</td>
                <td data-label="${this.locale.common.phone}">${employee.phone}</td>
                <td data-label="${this.locale.common.email}">${employee.email}</td>
                <td data-label="${this.locale.common.department}">${employee.department}</td>
                <td data-label="${this.locale.common.position}">${employee.position}</td>
                <td data-label="${this.locale.common.actions}">
                  <button class="edit-button" @click=${() => this.editEmployee(employee)}>
                    <img src="../../../assets/icon/edit.svg"/>
                  </button>
                  <button class="delete-button" @click=${() => this.deleteEmployee(employee)}>
                    <img src="../../../assets/icon/delete.svg"/>
                  </button>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
      <pagination-component
        .totalPages=${totalPages}
        .currentPage=${this.currentPage}
        @page-changed=${this.pageChanged}
      ></pagination-component>
    `;
  }

  pageChanged(e) {
    this.currentPage = e.detail.currentPage;
  }

  selectAll(event) {
    const checkboxes = this.renderRoot.querySelectorAll('.row-checkbox');
    checkboxes.forEach((checkbox) => (checkbox.checked = event.target.checked));
  }

  editEmployee(employee) {
    this.employeeToConfirm = employee;
    this.confirmType = 'edit';
    Router.go(`/edit-employee/${employee.id}`); 
  }

  deleteEmployee(employee) {
    this.employeeToConfirm = employee;
    this.confirmType = 'delete';
  }

  confirmEdit() {
    Router.go(`/edit-employee/${this.employeeToConfirm.id}`);
    this.employeeToConfirm = null;
  }

  confirmDelete() {
    employeeStore.removeEmployee(this.employeeToConfirm.id);
    this.employeeToConfirm = null;
  }

  cancelConfirm() {
    this.employeeToConfirm = null;
  }
}

customElements.define('employee-list-table', EmployeeListTable);