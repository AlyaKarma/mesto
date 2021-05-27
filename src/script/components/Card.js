export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    // тут можно изменить дату на объект
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this.element = this._getTemplate();
    this._newCardTitle = this.element.querySelector('.card__title')
    this._newCardImage = this.element.querySelector('.card__image');
    this._newCardDelete = this.element.querySelector('.card__delete');
    this._newCardLike = this.element.querySelector('.card__like-btn');

  }

  _getTemplate() {
    const _cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card__item')
    .cloneNode(true)

    return _cardElement;
  }

  createCard() {
    _newCardTitle.textContent = this._name;
    _newCardImage.src = this._link;
    _newCardImage.alt = this.name;

    this._setListeners(this._newCardDelete, this._newCardLike, this._newCardImage);

    return this.element;
  }

  _likeCard(evt) {
    const _cardLikeBtn = evt.target;
    _cardLikeBtn.classList.toggle('card__like-btn_active')
  }

  _deleteCard(evt) {
    const _cardDeleteBtn = evt.target;
    _cardDeleteBtn.closest('.card__item').remove();
  }

  _setListeners(cardDeleteBtn, cardLikeBtn, cardImage) {
    cardDeleteBtn.addEventListener('click', (evt) => this._deleteCard(evt));
    cardLikeBtn.addEventListener('click', (evt) => this._likeCard(evt));
    cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export {Card};
