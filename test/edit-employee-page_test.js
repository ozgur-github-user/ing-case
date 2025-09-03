import { html, fixture, assert } from '@open-wc/testing';
import '../src/pages//edit-employee/edit-employee.js';
import { employeeStore } from '../src/store/EmployeeStore.js';
import initialEmployees from '../src/data/employees.js';

suite('edit-employee-page', () => {
  let el;
  const mockLocation = {
    params: { id: '1' },
  };

  setup(async () => {
    employeeStore._employees$.next(initialEmployees);
    el = await fixture(html`<edit-employee-page .location=${mockLocation}></edit-employee-page>`);
    await el.updateComplete;
  });

  test('is defined', () => {
    assert.instanceOf(el, customElements.get('edit-employee-page'));
  });

  test('renders the form for an existing employee', () => {
    const addEmployeeComponent = el.shadowRoot.querySelector('add-employee');
    assert.isNotNull(addEmployeeComponent, 'add-employee component should be rendered');
    const expectedEmployee = initialEmployees.find(e => e.id.toString() === mockLocation.params.id);
    assert.deepEqual(el.employee, expectedEmployee, 'Correct employee data should be loaded');
  });

  test('renders a "not found" message for a non-existing employee', async () => {
    const nonExistingLocation = { params: { id: '999' } };
    el = await fixture(html`<edit-employee-page .location=${nonExistingLocation}></edit-employee-page>`);
    await el.updateComplete;
    
    const addEmployeeComponent = el.shadowRoot.querySelector('add-employee');
    const notFoundMessage = el.shadowRoot.querySelector('p');
    
    assert.isNull(addEmployeeComponent, 'add-employee component should not be rendered');
    assert.isNotNull(notFoundMessage, 'Not found message should be rendered');
  });

  test('shows confirm modal on "open-confirm-modal" event', async () => {
    const addEmployeeComponent = el.shadowRoot.querySelector('add-employee');
    const updatedEmployee = { ...initialEmployees[0], first_name: 'Aaron-Updated' };
    
    const event = new CustomEvent('open-confirm-modal', { detail: updatedEmployee });
    
    addEmployeeComponent.dispatchEvent(event);
    await el.updateComplete;

    const confirmModal = el.shadowRoot.querySelector('confirm-modal');
    assert.isTrue(el.showConfirmModal, 'showConfirmModal property should be true');
    assert.isNotNull(confirmModal, 'confirm-modal should be rendered');
    assert.deepEqual(el.employee, updatedEmployee, 'employee property should be updated with event detail');
  });

  test('updates employee in store when onEmployeeSaved is called', () => {
    const updatedEmployee = { ...initialEmployees[0], first_name: 'Updated First Name' };
    el.employee = updatedEmployee;
    
    el.onEmployeeSaved();

    const employeeFromStore = employeeStore.getEmployeeById(1);
    assert.equal(employeeFromStore.first_name, updatedEmployee.first_name, 'Employee in store should be updated');
    assert.isFalse(el.showConfirmModal, 'showConfirmModal should be false after saving');
  });
});
