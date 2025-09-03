import {css} from 'lit';

export default css`
  :host {
    font-family: sans-serif;
    margin:0;
    padding: 0;
  }


  .app {
    margin: 0 auto;
    height: 100vh;
    max-width: 1400px;
  }

  .app-body {
    height: calc(100vh - 60px);
    padding: 0 50px 0 50px;
  }
`;
