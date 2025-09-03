import { css } from 'lit';

export default css`
  .change-view {
    display: flex;
    place-items: center;
    gap: 15px;
  }

  .table-view-icon {
    height: 45px;
    width: 45px;
  }

  .grid-view.icon {
     height: 30px;
      width: 30px;
   }

  .views {
    height: 100%;
  }

  .pl-30 {
    padding-left: 30px;
    display: block;
  }

  @media screen and (max-width: 1200px) {
    .table-view-icon {
      height: 35px;
      width:  35px;
    }

    .grid-view-icon {
      height: 25px;
      width: 25px;
    } 
  }

  @media screen and (max-width: 1000px) {
    .table-view-icon {
      height: 30px;
      width:  30px;
    }

    .grid-view-icon {
      height: 20px;
      width: 20px;
    } 
  }
`;
