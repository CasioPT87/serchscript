const fetch = require('node-fetch')

const KEY = 'cucarachasAppSession'

class Api {
    send = () => {
      const token = this.getToken()
      headers.authentication = token
      fetch(method, body, headers)
    }

    getToken = () => {
        if (window.localStorage) {
            const tokenString = localStorage.getItem(KEY);
            return JSON.parse(tokenString)
        }
        return null
    }

    setToken = (token) => {
        if (window.localStorage) {
            localStorage.setItem(KEY, JSON.stringify(token));
            return true
        }
        return false
    }
}

const api = new Api()

module.exports = {
    send: api.send,
    setToken: api.setToken
}