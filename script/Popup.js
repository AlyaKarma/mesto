export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keyup', _handleEscClose);
  };

  closePopup() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keyup', _handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  };

  setEventListeners = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.closePopup();
    }
  }
}
