export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    const getUserDataPromise = fetch(`${this._baseUrl}/v1/cohort-26/users/me`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res));

    return getUserDataPromise
    .then(data => {
      console.log(data);
    })
  }

  updateUserData(userData) {
    const updateUserDataPromise = fetch(`${this._baseUrl}/v1/cohort-26/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify ({
        name: userData.name,
        about: userData.profession
      })
    })
    .then(res => this._checkResponse(res));

    return updateUserDataPromise;
  }


}

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/cards',
  headers: {
    'Content-Type': 'application/json'
  },
}

const api = new Api(config);
