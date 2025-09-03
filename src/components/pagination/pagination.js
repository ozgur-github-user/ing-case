import { LitElement, html } from 'lit';
import styles from './pagination-styles.js';

export class Pagination extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      totalPages: { type: Number },
      currentPage: { type: Number },
    };
  }

  constructor() {
    super();
    this.totalPages = 7;
    this.currentPage = 1;
  }

  render() {
    const pagination = this._getPagination();

    return html`
      <div class="pagination">
        <button class="nav-button ${this.curren}" @click=${this.goToPreviousPage} >
          <img src="../../../assets/icon/arrow-left.svg"/> 
        </button>
        ${pagination.map((page) =>
          typeof page === 'number'
            ? html`
                <button
                  class="page-button ${this.currentPage === page ? 'active' : ''}"
                  @click=${() => this.goToPage(page)}
                >
                  ${page}
                </button>
              `
            : html`<span class="ellipsis">...</span>`
        )}
        <button class="nav-button" @click=${this.goToNextPage}>
          <img src="../../../assets/icon/arrow-right.svg"/>
        </button>
      </div>
    `;
  }

  _getPagination() {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;

    const totalSlots = 7;

    if (totalPages <= totalSlots) {
      if (totalPages === 0) {
        return [];
      }
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage < 5) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage > totalPages - 4) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.dispatchPageChangeEvent();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.dispatchPageChangeEvent();
    }
  }

  goToPage(page) {
    this.currentPage = page;
    this.dispatchPageChangeEvent();
  }

  dispatchPageChangeEvent() {
    this.dispatchEvent(new CustomEvent('page-changed', { detail: { currentPage: this.currentPage } }));
  }
}

customElements.define('pagination-component', Pagination);
