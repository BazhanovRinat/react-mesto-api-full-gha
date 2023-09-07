export default class Api {
    constructor(data) {
        this.url = data.url;
        this.headers = data.headers;
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return this._request(`${this.url}/cards`, {
            headers: this.headers,
        })
    }

    deleteCard(cardId) {
        return this._request(`${this.url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        })
    }

    changeLikeCardStatus(cardId, isCardLike) {
        if (isCardLike) {
            return this.cardLike(cardId)
        }
        else {
            return this.cardLikeRemove(cardId)
        }
    }

    cardLike(cardId) {
        return this._request(`${this.url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers,
        })
    }

    cardLikeRemove(cardId) {
        return this._request(`${this.url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers,
        })
    }

    postCard(item) {
        return this._request(`${this.url}/cards/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })
        })
    }

    setProfileInfo(item) {
        return this._request(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: item.name,
                about: item.about
            })
        })
    }

    setProfileAvatar(item) {
        return this._request(`${this.url}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: item.avatar,
            })
        })
    }

    profileDataInstall() {
        return this._request(`${this.url}/users/me`, {
            headers: this.headers,
        })
    }

}

// export const api = new Api({
//     url: 'https://mesto.nomoreparties.co/v1/cohort-63/',
//     headers: {
//         authorization: '52af015b-cc8d-4640-80fa-207f5ac44ed7',
//         'Content-Type': 'application/json'
//     }
// })

export const api = new Api({
    url: 'https://api.Bazhanov.Rinat.nomore.nomoredomainsicu.ru',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
    }
})