import { css } from 'lit';

export default css`
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .modal-content {
    background: #fff;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    color: #FF6200;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    color: #FF6200;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 18px;
  }

  .close-button {
    background: none;
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  .modal-body {
    padding: 16px;
    font-size: 16px;
    color: #333;
  }

  .modal-footer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    background-color: white;
  }

  .proceed-button {
    color: #fff;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    background-color: #FF6200;
  }

  .cancel-button {
    color: #5D3FD3;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    background-color: white;
    border: 1px solid #5D3FD3;
  }
`;
