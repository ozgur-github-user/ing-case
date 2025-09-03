import { LitElement, html } from 'lit';
import { employeeStore } from '../../store/EmployeeStore.js';
import styles from './employee-list-styles.js';
import '../../components/employee-list-table/employee-list-table.js';
import '../../components/employee-card-list/employee-card-list.js';
import '../../components/search/search.js';
import sharedStyles from '../../styles/shared-styles.js'
import en from '../../locales/en.js';
import tr from '../../locales/tr.js';

const translations = {
  en,
  tr
};

export class EmployeeListPage extends LitElement {
  static get styles() {
    return [sharedStyles, styles];
  }

  static get properties() {
    return {
      employees: { type: Array },
      allEmployees: { type: Array },
      viewMode: { type: String },
      locale: { type: Object },
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.allEmployees = [];
    this.viewMode = employeeStore._viewMode$.getValue();
    const lang = document.documentElement.lang || 'en';
    this.locale = translations[lang];
    this._subscriptions = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this._subscriptions.push(
      employeeStore.employees$.subscribe((employees) => {
        this.allEmployees = employees;
        this.employees = employees;
      }),
      employeeStore.viewMode$.subscribe((viewMode) => {
        this.viewMode = viewMode;
      })
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  render() {
    return html`
    <div class="employee-list-page-container">
      <div class="heading">
        <p>${this.locale.employeeListPage.employeeList}</p>
        <div class="change-view">
          <span class="table-view">
            <img src="../../../assets/icon/table-view.svg" class="table-view-icon" @click=${() => this.setViewMode('table')} style="cursor: pointer; opacity: ${this.viewMode === 'table' ? '1' : '0.3'};">
          </span>
          <span class="grid-view">
            <img src="../../../assets/icon/grid-view.svg" class="grid-view-icon" @click=${() => this.setViewMode('grid')} style="cursor: pointer; opacity: ${this.viewMode === 'grid' ? '1' : '0.3'};"/>
          </span>
        </div>
      </div>
      <search-component @search=${this.handleSearch} class=${this.viewMode === 'grid' ? 'pl-30' : ''}></search-component>
      <div class="views">
        ${this.viewMode === 'table'
          ? html`<employee-list-table .employees=${this.employees}></employee-list-table>`
          : html`<employee-card-list .employees=${this.employees}></employee-card-list>`}
      </div>
    </div>
    `;
  }

  handleSearch(e) {
    const searchTerm = e.detail.toLowerCase();

    const employeeMatches = (employee) => {
      const employeeValues = Object.values(employee);
      return employeeValues.some(value => String(value).toLowerCase().includes(searchTerm));
    };

    this.employees = this.allEmployees.filter(employeeMatches);
  }

  setViewMode(mode) {
    employeeStore.setViewMode(mode);
  }
}

customElements.define('employee-list-page', EmployeeListPage);