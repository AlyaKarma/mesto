import Popup from './Popup'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form_type_confirm');
  }

//открытие окна
  openPopup(cardId) {
    this._cardId = cardId;
    super.openPopup();
  }

//установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._cardId);
    });
  }
}
