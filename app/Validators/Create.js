'use strict'

class Create {
  get rules () {
    return {
      username: 'required|string|unique:users,username',
      email:  'required|email',
      password: 'required',
    }
  }
}

module.exports = Create
