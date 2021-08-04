export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //_________________Проверка состояния промиса
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //_________________Получение информации о пользователе с сервера
  getUserData() {
    const getUserDataPromise = fetch(`${this._baseUrl}/v1/cohort-26/users/me`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res));

    return getUserDataPromise;
  }

  //_________________Редактирование профиля
  updateUserData(userData) {
    const updateUserDataPromise = fetch(`${this._baseUrl}/v1/cohort-26/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name: userData.name,
        about: userData.about
      })
    })
    .then(res => this._checkResponse(res));

    return updateUserDataPromise;
  }

  //_________________Загрузка карточек с сервера
  getInitialCards = () => {
    const getInitialCardsPromise = fetch(`${this._baseUrl}/v1/cohort-26/cards`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res));

    return getInitialCardsPromise;
  }

  //_________________Добавление новой карточки
  addNewCard(newCardData) {
    const addNewCardPromise = fetch(`${this._baseUrl}/v1/cohort-26/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify ({
        name: newCardData.name,
        link: newCardData.link
      })
    })
    .then(res => this._checkResponse(res));

    return addNewCardPromise;
  }

  //_________________Поставить/убрать лайк карточке
  likesCard(method, id) {
    const likesCardPromise = fetch(`https://mesto.nomoreparties.co/v1/cohort-26/cards/likes/${id}`, {
      method: method,
      headers: this._headers
    })
    .then(res => this._checkResponse(res));

    return likesCardPromise;
  }

  //_________________Удалить карточку
  deleteCard(id) {
    const deleteCardPromise = fetch(`${this._baseUrl}/v1/cohort-26/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res));

    return deleteCardPromise;
  }

  //_________________Сменить аватарку
  changeAvatar(userAvatar) {
    const changeAvatarPromise = fetch('https://mesto.nomoreparties.co/v1/cohort-26/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        avatar: userAvatar
      })
    })
    .then(res => this._checkResponse(res));

    return changeAvatarPromise;
  }
}
