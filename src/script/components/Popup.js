export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._submitBtn = this._popup.querySelector('.popup__save');
  }

  openPopup() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleEscClose);
  };

  closePopup() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  };

  _closePopups = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.closePopup();
    }
  };

  //__________________Изменение надписи на кнопке

  changeButtonText = (text) => {
    this._submitBtn.textContent = text;
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._closePopups)
  };
}
