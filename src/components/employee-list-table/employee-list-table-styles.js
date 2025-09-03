import {css} from 'lit';

export default css`
  table {
    width: 100%;
    border-collapse: collapse;
    overflow-x: scroll;
    white-space: nowrap;
    height: 100%;
    margin-bottom: 20px;
    background-color: white;
    table-layout: fixed;
    overflow-x: scroll;
    border-radius: 5px;
  }

  th:nth-child(1), td:nth-child(1) { width: 3%; }
  th:nth-child(2), td:nth-child(2) { width: 7%; }
  th:nth-child(3), td:nth-child(3) { width: 7%; }
  th:nth-child(4), td:nth-child(4) { width: 12%; }
  th:nth-child(5), td:nth-child(5) { width: 12%; }
  th:nth-child(6), td:nth-child(6) { width: 10%; }
  th:nth-child(7), td:nth-child(7) { width: 20%; }
  th:nth-child(8), td:nth-child(8) { width: 14%; } 
  th:nth-child(9), td:nth-child(9) { width: 10%; }
  th:nth-child(10), td:nth-child(10) { width: 8%; }

  th, td {
    padding: 8px;
    text-align: center;
    min-width: 100px;
  }

  td {
    color: grey;
    height: auto;
  }

  th {
    height: 70px;
    border-bottom: 1px solid #ddd;
    color: #FF6200;
    font-weight: 400;
  }

  tr {
    border-bottom: 1px solid rgba(221, 221, 221, 0.4);
  }

  .first-name-data,
  .last-name-data {
    color: black;
  }

  button {
    padding: 4px 8px;
    cursor: pointer;
    border: none;
    background: none;
  }

  button svg {
    pointer-events: none; /* Ensure the icon inside the button doesn't interfere with clicks */
  }

  .row-checkbox {
    width: 1.4em;
    height: 1.4em;
    background-color: white;
    border-radius: 15px;
    vertical-align: middle;
    border: 1px solid lightgray;
    cursor: pointer;
    accent-color: #FF6200;
  }

  .delete-button, .edit-button {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

@media screen and (max-width: 1400px) {
  table {
    font-size: 0.85rem;
  }

  .delete-button, .edit-button {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
}

@media screen and (max-width: 1200px) {
  table {
    font-size: 0.60rem; 
  }

  .delete-button, .edit-button {
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
}

@media screen and (max-width: 1000px) {
  table {
    font-size: 0.55rem;
  }

  .delete-button, .edit-button {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
`;