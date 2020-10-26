const configAuth = {
  baseUrl: 'http://api.zaj.students.nomoreparties.space',
  headers: {
    'Content-Type': 'application/json'
  }
};

class ApiAuth {
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
    console.log(`Ошибка: ${error}`)
    return Promise.reject(error)
  }

  signUp(userEmail, userPassword) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: userPassword,
        email: userEmail
      })
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }

  signIn(userEmail, userPassword) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: userPassword,
        email: userEmail
      })
    })
      .then(this._handleResponse)
      .then ((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        } else {
          return;
        }
      })
      .catch(this._handleResponseError);
  }

  autoSign(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.headers,
        'authorization': `Bearer ${jwt}`
      }
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError);
  }
}

const apiAuth = new ApiAuth(configAuth);
export default apiAuth;
