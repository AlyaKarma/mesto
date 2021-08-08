export default class Card {
  constructor(data, cardSelector, handleCardClick, handleSendLike, handleDeleteLike, openPopupConfirm) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._handleSendLike = handleSendLike;
    this._handleDeleteLike = handleDeleteLike;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupConfirm = openPopupConfirm;
    this.element = this._getTemplate();
    this._newCardTitle = this.element.querySelector('.card__title')
    this._newCardImage = this.element.querySelector('.card__image');
    this._newCardDelete = this.element.querySelector('.card__delete');
    this._newCardLike = this.element.querySelector('.card__like-btn');
    this._newCardLikesCounter = this.element.querySelector('.card__like_counter');
  }

  _getTemplate() {
    const _cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card__item')
    .cloneNode(true)

    return _cardElement;
  }

  createCard(userId) {
    this._newCardTitle.textContent = this._name;
    this._newCardImage.src = this._link;
    this._newCardImage.alt = this._name;
    this._checkLikes(userId);
    this._checkAuthor(userId);
    this._setListeners();

    return this.element;
  }

  getId() {
    return this._id;
  }



  _likeCard (evt) {
    const _cardLikeBtnTarget = evt.target;
    _cardLikeBtnTarget.classList.toggle('card__like-btn_active');
    if (_cardLikeBtnTarget.classList.contains('card__like-btn_active')) {
      this._handleSendLike(this._id);
    } else {
      this._handleDeleteLike(this._id);
    }
  }

  _checkLikes(userId) {
    this._likes.forEach(like => {
      if (like._id === userId) {
        this._newCardLike.classList.add('card__like-btn_active');
      }
    });
    this.countLikes(this._likes.length);
  }

  countLikes(count) {
    this._newCardLikesCounter.textContent = count;
  }

  _checkAuthor(userId) {
    if (userId === this._owner) {
      this._newCardDelete.classList.remove('card__delete_hidden');
    }
  }

  deleteCard() {
    this.element.remove();
  }

  _setListeners = () => {
    this._newCardDelete.addEventListener('click', () => this._openPopupConfirm(this._id));
    this._newCardLike.addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
    this._newCardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
}

