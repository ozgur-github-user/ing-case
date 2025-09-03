import { LitElement, html } from 'lit';
import styles from './confirm-modal-styles.js';
import en from '../../locales/en.js';
import tr from '../../locales/tr.js';

const translations = {
  en,
  tr
};

export class ConfirmModal extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      employee: { type: Object },
      actionType: { type: String },
      locale: { type: Object },
    };
  }

  constructor() {
    super();
    this.employee = null;
    const lang = document.documentElement.lang || 'en';
    this.locale = translations[lang];
  }

  render() {

    let action = '';
    switch (this.actionType) {
      case 'edit':
        action = this.locale.common.edited;
        break;
      case 'delete':
        action = this.locale.common.deleted;
        break;
      case 'add':
        action = this.locale.common.added;
        break;
    }

    const message = this.locale.confirmModal.confirmMessage
      .replace('{name}', `${this.employee.first_name} ${this.employee.last_name}`)
      .replace('{action}', action);

    return html`
      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>${this.locale.confirmModal.areYouSure}</h2>
            <button class="close-button" @click=${this.onCancel}>
              <img src="../../../assets/icon/close.svg"/>>
            </button>

          </div>
          <div class="modal-body">
            <p>${message}</p>
          </div>
          <div class="modal-footer">
            <button class="proceed-button" @click=${this.onConfirm}>${this.locale.common.proceed}</button>
            <button class="cancel-button" @click=${this.onCancel}>${this.locale.common.cancel}</button>
          </div>
        </div>
      </div>
    `;
  }

  onConfirm() {
    switch (this.actionType) {
      case 'edit':
        this.dispatchEvent(new CustomEvent('confirm-edit'));
        break;
      case 'delete':
        this.dispatchEvent(new CustomEvent('confirm-delete'));
        break;
      case 'add':
        this.dispatchEvent(new CustomEvent('confirm-add'));
        break;
    }
  }

  onCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }
}

customElements.define('confirm-modal', ConfirmModal);