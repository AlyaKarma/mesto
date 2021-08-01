export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._currentUserId = '453525cde60476829f73e874';
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
    this._newCardTitle.textContent = this._name;
    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._name;

    this._setListeners(this._newCardDelete, this._newCardLike, this._newCardImage);

    return this.element;
  }

  _likeCard (evt) {
    const _cardLikeBtnTarget = evt.target;
    _cardLikeBtnTarget.classList.toggle('card__like-btn_active')
  }

  _deleteCard (evt) {
    const _cardDeleteBtnTarget = evt.target;
    _cardDeleteBtnTarget.closest('.card__item').remove();
  }

  _setListeners = (deleteBtn, likeBtn, cardImage) => {
    deleteBtn.addEventListener('click', (evt) => this._deleteCard(evt));
    likeBtn.addEventListener('click', (evt) => this._likeCard(evt));
    cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

