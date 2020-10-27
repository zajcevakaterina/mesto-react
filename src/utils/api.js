const config = {
  baseUrl: 'https://api.mst.students.nomoreparties.xyz',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log(`Ошибка: ${response.status}`)
      return Promise.reject(response.statusText)
    }
  }

  _handleResponseError(error) {
    console.log(`Ошибка: ${error.message}`)
    return Promise.reject(error.message)
  }

  getUserInfo() {
    console.log('вызвали')
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  setUserInfo(name, job) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: name,
        about: job,
      })
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  setUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          ...this.headers,
          authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
      })
        .then(this._handleResponse)
        .catch(this._handleResponseError);
    }
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }
}

const api = new Api(config);
export default api;
