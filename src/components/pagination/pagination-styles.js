import { css } from 'lit';

export default css`
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .nav-button,
  .page-button {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background-color: rgb(242, 242, 242);
    color: grey;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .orange {
    color: #FF6200
  }

  .nav-button:disabled {
    background-color: #FFFFFF;
    cursor: not-allowed;
  }

  .page-button.active {
    background-color:#FF6200;
    color: white;
    font-weight: bold;
  }

  .page-button:hover:not(.active),
  .nav-button:hover:not(:disabled) {
    background-color: #e0e0e0;
  }


  @media screen and (max-width: 1400px) {
    .page-button {
      font-size: 0.65rem;
    }
  }

  @media screen and (max-width: 1200px) {
    .page-button {
      font-size: 0.60rem;}
  }

  @media screen and (max-width: 1000px) {
    .page-button {
      font-size: 0.55rem;}
  }
`;
