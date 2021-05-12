class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

  _likeCard(evt) {
    const cardLikeBtn = evt.target;
    cardLikeBtn.classList.toggle('card__like-btn_active')
  }

  _deleteCard(evt) {
    const cardDeleteBtn = evt.target;
    cardDeleteBtn.closest('.card__item').remove();
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
