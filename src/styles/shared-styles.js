import { css } from 'lit';

export default css`
  .heading {
    font-size: 2rem;
    display: flex;
    align-items: center;
    height: 100px;
    color: #FF6200;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: 	rgb(242, 242, 242);
  }


  @media screen and (max-width: 1400px) {
    .heading {
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 1200px) {
    .heading {
      font-size: 1.2rem;
    }
  }

  @media screen and (max-width: 1000px) {
      .heading {
        font-size: 1rem;
      }
  }
`;