import { BehaviorSubject } from 'rxjs';
import data from '../data/employees.js';

class EmployeeStore {
  constructor() {
    this._employees$ = new BehaviorSubject(data);
    this._viewMode$ = new BehaviorSubject('table');
  }

  get employees$() {
    return this._employees$.asObservable();
  }

  get viewMode$() {
    return this._viewMode$.asObservable();
  }

  setViewMode(mode) {
    this._viewMode$.next(mode);
  }

  addEmployee(employee) {
    const currentEmployees = this._employees$.getValue();
    const newId = Math.max(...currentEmployees.map(e => e.id)) + 1;
    const newEmployee = { ...employee, id: newId };
    this._employees$.next([...currentEmployees, newEmployee]);
  }

  removeEmployee(id) {
    const currentEmployees = this._employees$.getValue();
    const updatedEmployees = currentEmployees.filter((emp) => emp.id !== id);
    this._employees$.next(updatedEmployees);
  }

  editEmployee(updatedEmployee) {
    const currentEmployees = this._employees$.getValue();
    const updatedEmployees = currentEmployees.map((emp) =>
      emp.id === updatedEmployee.id ? { ...emp, ...updatedEmployee } : emp
    );
    this._employees$.next(updatedEmployees);
  }

  getEmployeeById(id) {
    const currentEmployees = this._employees$.getValue();
    return currentEmployees.find((employee) => employee.id === id);
  }
}

export const employeeStore = new EmployeeStore();
