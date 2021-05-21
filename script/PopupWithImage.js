import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgPic = this._popup.querySelector('.popup__img');
    this._popupImgTxt = this._popup.querySelector('.popup__caption');
  }

  openPopup = (name, link) => {
    super.openPopup(name, link);
    this._popupImgPic.src = link;
    this._popupImgPic.alt = name;
    this._popupImgTxt.textContent = name;
  };
}
