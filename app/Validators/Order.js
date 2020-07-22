'use strict'
const Antl = use('Antl')
const {rule} =use('Validator')

class Order {
  get validateAll(){
  return true;
  }
  get rules () {
    return {
      user_id: [rule("required"), rule("exists", ['users', 'id'])],
      zipcode: [rule("required")],
      street: [rule("required")],
      number: [rule("required")],
      city: [rule("required")],
      state:[rule("required")],
    }
  }
get messages(){
  return Antl.list('validation')
}
}

module.exports = Order
