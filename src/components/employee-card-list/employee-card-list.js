import { LitElement, html } from 'lit';
import styles from './employee-card-list-style.js';
import '../pagination/pagination.js';
import { employeeStore } from '../../store/EmployeeStore.js';
import { Router } from '@vaadin/router';
import '../employee-card/employee-card.js';
import '../confirm-modal/confirm-modal.js';

export class EmployeeCards extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      employees: { type: Array },
      currentPage: { type: Number },
      deletingEmployee: { type: Object },
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.currentPage = 1;
    this.deletingEmployee = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.subscription = employeeStore.employees$.subscribe((employees) => {
      this.employees = employees;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.subscription.unsubscribe();
  }

  render() {
    const itemsPerPage = 4;
    const startIndex = (this.currentPage - 1) * itemsPerPage;
    const paginatedEmployees = this.employees.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(this.employees.length / itemsPerPage);

    return html`
      ${this.deletingEmployee
        ? html`
            <confirm-modal
              .employee=${this.deletingEmployee}
              @confirm-delete=${this.confirmDelete}
              @cancel=${this.cancelDelete}
            ></confirm-modal>
          `
        : ''}
      <div class="cards-container">
        ${paginatedEmployees.map(
          (employee) => html`<employee-card
            .employee=${employee}
            @edit-employee=${this.handleEdit}
            @delete-employee=${this.handleDelete}
          ></employee-card>`
        )}
      </div>
      <div class="pagination-container">
          <pagination-component
          .totalPages=${totalPages}
          .currentPage=${this.currentPage}
          @page-changed=${this.pageChanged}
        ></pagination-component>
      </div>
    `;
  }

  pageChanged(e) {
    this.currentPage = e.detail.currentPage;
  }

  handleEdit(e) {
    this.editEmployee(e.detail);
  }

  handleDelete(e) {
    this.deleteEmployee(e.detail);
  }

  editEmployee(employee) {
    Router.go(`/edit-employee/${employee.id}`);
  }

  deleteEmployee(employee) {
    this.deletingEmployee = employee;
  }

  confirmDelete() {
    employeeStore.removeEmployee(this.deletingEmployee.id);
    this.deletingEmployee = null;
  }

  cancelDelete() {
    this.deletingEmployee = null;
  }
}

customElements.define('employee-card-list', EmployeeCards);
