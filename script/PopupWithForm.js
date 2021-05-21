import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues = () => {
    const values = {};
    this._inputsList.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  };

  _handlerSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(thit._getInputValues);
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handlerSubmit);
  };

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
