import { css } from 'lit';

export default css`
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:white;
    padding: 0 14px 0 14px;
    height: 60px;
    font-size: 14px;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
  }

  .nav-left img {
    width: 24px;
    height: 24px;
  }

  .nav-left .company-name {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  .logo {
    height: 24px;
    width: 24px;
    display: inline-block;
  }

  .nav-link {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
  }

  .nav-link.active {
    font-weight: 400;
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  .actions {
    display: flex;
    place-items: center;
    gap:10px
  }

  .navigate, .flags {
    display: flex;
    place-items: center;
    gap: 5px;
    color: #FF6200;
    font-weight: 400;
    font-size: 14px;
  }

  .flag-icon:hover {
    transform: scale(1.1);
  }
`;
