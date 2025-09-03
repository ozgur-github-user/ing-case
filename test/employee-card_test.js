import { html, fixture, assert } from '@open-wc/testing';
import '../src/components/employee-card/employee-card.js';
import initialEmployees from '../src/data/employees.js';

suite('employee-card', () => {
  const mockEmployee = initialEmployees[0];

  test('is defined', () => {
    const el = document.createElement('employee-card');
    assert.instanceOf(el, customElements.get('employee-card'));
  });

  test('renders all employee data correctly', async () => {
    const el = await fixture(html`<employee-card .employee=${mockEmployee}></employee-card>`);
    await el.updateComplete;

    const renderedData = el.shadowRoot.querySelector('.card').textContent;
    
    assert.include(renderedData, mockEmployee.first_name);
    assert.include(renderedData, mockEmployee.last_name);
    assert.include(renderedData, mockEmployee.date_of_employment);
    assert.include(renderedData, mockEmployee.date_of_birth);
    assert.include(renderedData, mockEmployee.phone);
    assert.include(renderedData, mockEmployee.email);
    assert.include(renderedData, mockEmployee.department);
    assert.include(renderedData, mockEmployee.position);
  });

  test('renders all labels with correct localization', async () => {
    const el = await fixture(html`<employee-card .employee=${mockEmployee}></employee-card>`);
    await el.updateComplete;

    const labels = el.shadowRoot.querySelector('.card').textContent;
    assert.include(labels, 'First Name');
    assert.include(labels, 'Last Name');
    assert.include(labels, 'Date of Employment');
    assert.include(labels, 'Date of Birth');
    assert.include(labels, 'Phone');
    assert.include(labels, 'Email');
    assert.include(labels, 'Department');
    assert.include(labels, 'Position');

    const editButton = el.shadowRoot.querySelector('.edit-button');
    const deleteButton = el.shadowRoot.querySelector('.delete-button');
    assert.include(editButton.textContent, 'Edit');
    assert.include(deleteButton.textContent, 'Delete');
  });

  test('dispatches "edit-employee" event on edit button click', async () => {
    let eventFired = false;
    let eventDetail = null;
    const el = await fixture(html`<employee-card .employee=${mockEmployee}></employee-card>`);
    
    el.addEventListener('edit-employee', (e) => {
      eventFired = true;
      eventDetail = e.detail;
    });

    const editButton = el.shadowRoot.querySelector('.edit-button');
    editButton.click();
    
    assert.isTrue(eventFired, 'edit-employee event should be fired');
    assert.deepEqual(eventDetail, mockEmployee, 'event detail should contain the employee data');
  });

  test('dispatches "delete-employee" event on delete button click', async () => {
    let eventFired = false;
    let eventDetail = null;
    const el = await fixture(html`<employee-card .employee=${mockEmployee}></employee-card>`);
    
    el.addEventListener('delete-employee', (e) => {
      eventFired = true;
      eventDetail = e.detail;
    });

    const deleteButton = el.shadowRoot.querySelector('.delete-button');
    deleteButton.click();
    
    assert.isTrue(eventFired, 'delete-employee event should be fired');
    assert.deepEqual(eventDetail, mockEmployee, 'event detail should contain the employee data');
  });
});
