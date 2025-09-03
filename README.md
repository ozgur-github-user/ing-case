# Employee Management Web App

This is a web application for managing a list of employees, built with Lit Element. It allows users to view, add, edit, and delete employee records.

## Features

*   **View Employees:** Display a list of employees in either a table or a grid view.
*   **Add Employee:** Add new employees to the list through a form.
*   **Edit Employee:** Modify the details of existing employees.
*   **Delete Employee:** Remove employees from the list.
*   **Search:** Filter employees by name, email, etc.
*   **Localization:** The UI supports English and Turkish.

## Getting Started

### Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/ozgur-github-user/ing-case.git
npm install
```

### Development Server

To run the application locally for development, use the following command. This will start a development server and open the application in your browser.


npm run serve

Runs the application in development mode.

## Project Structure

Project has main directories below.

*   `src/components`: Contains reusable UI components.
    *   `add-employee`: Form for adding/editing employees.
    *   `confirm-modal`: Modal dialog for confirming actions.
    *   `employee-card-list`: Grid view for displaying employees.
    *   `employee-list-table`: Table view for displaying employees.
    *   `navbar`: Navigation bar component.
    *   `pagination`: Pagination component.
    *   `search`: Search input component.
*   `src/pages`: Contains the main pages of the application.
    *   `employee-list`: The main page that displays the list of employees.
    *   `edit-add-employee`: Page for adding or editing an employee.
*   `src/store`: Contains the application's state management logic (using RxJS).
*   `src/locales`: Contains the localization files for different languages.
*   `assets`: Contains static assets like icons and images.

## Store Management

In this project we dont have a heavy store data because of that lightweight store has been created by RxJS.

## Testing

This project uses [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) for testing. To run the tests, use:

```bash
npm run test
```
