import {css} from 'lit';

export default css`
  .cards-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    column-gap: 70px;
    padding: 0 30px 0 30px;
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  .pagination button {
    margin: 0 4px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }

  .pagination button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  .pagination-container {
    margin-top: 20px;
  }

  @media (max-width: 992px) {
  .cards-container {
    grid-template-columns: 1fr;
    gap: 50px;
    padding: 0 30px;
  }
}
`;