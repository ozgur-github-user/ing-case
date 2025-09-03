import {css} from 'lit';

export default css`
  .form-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 80px;
    column-gap: 200px;
    padding: 16px;
    margin-top: 50px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    margin-bottom: 10px;
    color: grey;
    font-weight: 200;
  }

  .form-group input,.form-group select {
    width: 220px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 16px; 
    height: 10px;
  }

  .form-group select {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 16px;
    height: 30px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="%23000" d="M2 4h8L6 8z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 10px center;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .form-actions {
    grid-column: span 3;
    display: flex;
    justify-content: center;
    margin-top: 16px;
    gap: 60px;
  }

  .save-button {
    width: 250px;
    background-color: #FF6200;
    color: white;
    border: none;
    border-radius: 8px;  
  }

  .cancel-button {
    color: #5D3FD3;
     width: 250px;
     border: none;
     border: 1px solid #5D3FD3;
     background-color: white;
     border-radius: 8px;
  }

  input[type="date"]::-webkit-datetime-edit {
    color: transparent;
  }

  button {
    padding: 8px 16px;
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    .form-container {
      grid-template-columns: repeat(2, 1fr);
    }
    .form-actions {
      grid-column: span 2;
    }
  }

  @media (max-width: 768px) {
    .form-container {
      grid-template-columns: 1fr;
    }
    .form-actions {
      grid-column: span 1;
    }
  }
`;
