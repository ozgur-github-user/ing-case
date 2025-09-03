import { html, fixture, assert } from '@open-wc/testing';
import '../src/components/employee-list-table/employee-list-table.js';
import { employeeStore } from '../src/store/EmployeeStore.js';
import initialEmployees from '../src/data/employees.js';

suite('employee-list-table', () => {
  let el;

  setup(async () => {
    employeeStore._employees$.next(initialEmployees);
    el = await fixture(html`<employee-list-table .employees=${initialEmployees}></employee-list-table>`);
    await el.updateComplete;
  });

  test('is defined', () => {
    assert.instanceOf(el, customElements.get('employee-list-table'));
  });

  test('renders a table with 10 rows by default', () => {
    const table = el.shadowRoot.querySelector('table');
    assert.isNotNull(table, 'Table is exist');
    const bodyRows = table.querySelectorAll('tbody tr');
    assert.equal(bodyRows.length, 10, 'Should be 10 employee rows on the first page');
  });

  test('displays correct data in the first row', () => {
    const firstRow = el.shadowRoot.querySelector('tbody tr');
    const firstEmployee = initialEmployees[0];
    const rowData = firstRow.textContent;

    assert.include(rowData, firstEmployee.first_name);
    assert.include(rowData, firstEmployee.last_name);
    assert.include(rowData, firstEmployee.email);
  });

  test('shows the second page of employees when page is changed', async () => {
    const pagination = el.shadowRoot.querySelector('pagination-component');
    pagination.dispatchEvent(new CustomEvent('page-changed', { detail: { currentPage: 2 } }));
    await el.updateComplete;

    const firstRowOnPage2 = el.shadowRoot.querySelector('tbody tr');
    const eleventhEmployee = initialEmployees[10];
    const rowData = firstRowOnPage2.textContent;
    
    assert.equal(el.currentPage, 2, 'currentPage property should be updated');
    assert.include(rowData, eleventhEmployee.first_name);
  });

  test('shows confirmation modal on delete button click', async () => {
    const firstRowDeleteButton = el.shadowRoot.querySelector('tbody tr .delete-button');
    firstRowDeleteButton.click();
    await el.updateComplete;

    const confirmModal = el.shadowRoot.querySelector('confirm-modal');
    assert.isNotNull(confirmModal, 'Confirmation modal should be rendered');
    assert.deepEqual(el.employeeToConfirm, initialEmployees[0]);
  });

  test('removes employee from store when deletion is confirmed', () => {
    const employeeToDelete = initialEmployees[1];
    el.employeeToConfirm = employeeToDelete;
    
    el.confirmDelete();

    const employeeFromStore = employeeStore.getEmployeeById(employeeToDelete.id);
    assert.isUndefined(employeeFromStore, 'Employee should be removed from the store');
    assert.isNull(el.employeeToConfirm, 'EmployeeToConfirm should be reset');
  });

  test('select all checkbox checks all row checkboxes', async () => {
    const selectAllCheckbox = el.shadowRoot.querySelector('thead .row-checkbox');
    selectAllCheckbox.checked = true;
    selectAllCheckbox.dispatchEvent(new Event('change'));
    await el.updateComplete;

    const rowCheckboxes = el.shadowRoot.querySelectorAll('tbody .row-checkbox');
    rowCheckboxes.forEach(checkbox => {
      assert.isTrue(checkbox.checked, 'Row checkbox should be selected');
    });
  });
});
