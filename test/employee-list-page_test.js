import { html, fixture, assert } from '@open-wc/testing';
import '../src/pages/employee-list/employee-list.js';
import '../src/components/employee-list-table/employee-list-table.js'
import { employeeStore } from '../src/store/EmployeeStore.js';
import initialEmployees from '../src/data/employees.js';

suite('employee-list-page', () => {
  let el;

  setup(async () => {
    // Reset the store state before each test to ensure test isolation
    employeeStore._employees$.next(initialEmployees);
    employeeStore._viewMode$.next('table');

    el = await fixture(html`<employee-list-page></employee-list-page>`);
    await el.updateComplete;
  });

  test('is defined', () => {
    assert.instanceOf(el, customElements.get('employee-list-page'));
  });

  test('renders table view by default', () => {
    const tableView = el.shadowRoot.querySelector('employee-list-table');
    const gridView = el.shadowRoot.querySelector('employee-card-list');
    assert.isNotNull(tableView, 'Table view should be rendered by default');
    assert.isNull(gridView, 'Grid view should not be rendered by default');
  });

  test('passes all employees to the table view by default', () => {
    const tableView = el.shadowRoot.querySelector('employee-list-table');
    assert.deepEqual(tableView.employees, initialEmployees);
  });

  test('switches to grid view on button click', async () => {
    const gridViewButton = el.shadowRoot.querySelector('.grid-view-icon');
    gridViewButton.click();
    await el.updateComplete;

    const tableView = el.shadowRoot.querySelector('employee-list-table');
    const gridView = el.shadowRoot.querySelector('employee-card-list');

    assert.equal(el.viewMode, 'grid', 'viewMode property should be \'grid\'');
    assert.isNull(tableView, 'Table  should be removed after switching');
    assert.isNotNull(gridView, 'Grid should be rendered after switching');
    assert.deepEqual(gridView.employees, initialEmployees, 'Grid view should receive all employees');
  });

  test('filters employees on search event', async () => {
    const searchComponent = el.shadowRoot.querySelector('search-component');
    const searchTerm = 'User1';
    
    const searchEvent = new CustomEvent('search', { detail: searchTerm });
    searchComponent.dispatchEvent(searchEvent);
    await el.updateComplete;

    const tableView = el.shadowRoot.querySelector('employee-list-table');

    assert.equal(tableView.employees.length, 12, 'There should be only one employee after filtering');
  });
});
