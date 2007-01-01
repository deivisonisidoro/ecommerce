/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Order = use('App/Models/Order');

class OrderController {
  async index({}){
    const order =  await Order.query().with("user", builder => {
      builder.select(['id', 'username',])
    }).fetch()
    return order;
  }

  async store({ request, response }) {
    const data = request.only(['user_id','zipcode','street','number','city','state'])
    
    const order = await Order.create(data)

    return response.status(201).json(order)
  }

  async show ({ params}) {
    const order = await Order.find(params.id)
    await order.load('user', builder => {
      builder.select(['id', 'username',])
    })
    return order
  }
  async update ({ params, request }) {
    const data = request.only(['user_id','zipcode','street','number','city','state'])
    const order = await Order.find(params.id)
    order.merge(data)
    await order.save()
    return order
  }
  async destroy ({ params}) {
    const order = await Order.find(params.id)

    await order.delete() 
  }
}

module.exports = OrderController;
