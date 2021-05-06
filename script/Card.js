import {openPopup} from './index.js';
import {popupImgPic, popupImgTxt, popupImg} from './index.js';

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card__item')
    .cloneNode(true)

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();

    const _newCardTitle = this._element.querySelector('.card__title')
    const _newCardImage = this._element.querySelector('.card__image');
    const _newCardDelete = this._element.querySelector('.card__delete');
    const _newCardLike = this._element.querySelector('.card__like-btn');

    _newCardTitle.textContent = this._name;
    _newCardImage.src = this._link;
    _newCardImage.alt = this.name;

    this._setListeners(_newCardDelete, _newCardLike, _newCardImage);

    return this._element;
  }

  _cardLike(evt) {
    const cardLikeBtn = evt.target;
    cardLikeBtn.classList.toggle('card__like-btn_active')
  }

  _cardDelete(evt) {
    const cardDeleteBtn = evt.target;
    cardDeleteBtn.closest('.card__item').remove();
  }

  _cardOpenImage(name, link) {
    this._cardImageData(name, link, popupImgPic, popupImgTxt);
    openPopup(popupImg);
  }

  _cardImageData(name, link, popupImgPic, popupImgTxt) {
    popupImgPic.src = link;
    popupImgPic.alt = name;
    popupImgTxt.textContent = name;
  }


//   const imgClickHandler = (evt) => {
//     popupImgPic.src = item.link;
//     popupImgPic.alt = 'Изображение';
//     popupImgTxt.textContent = item.name;
//     openPopup(popupImg);
//   }

  _setListeners(cardDeleteBtn, cardLikeBtn, cardImage) {
    cardDeleteBtn.addEventListener('click', (evt) => this._cardDelete(evt));
    cardLikeBtn.addEventListener('click', (evt) => this._cardLike(evt));
    cardImage.addEventListener('click', () => this._cardOpenImage(this._name, this._link));
  }
}

export {Card};
