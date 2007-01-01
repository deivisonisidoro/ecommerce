const { test, trait } = use('Test/Suite')('Order');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Order = use('App/Models/Order');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should able to create order', async ({
  assert,
  client,
}) => {
  
  const user = await Factory.model('App/Models/User').create();


  const response = await client
    .post('/order')
    .send({
      user_id: user.id,
      zipcode: '24060-00',
      street: 'Rua Imaginaria',
      number: 'n° 0',
      city: 'Rio de Janeiro',
      state: 'Rio de Janeiro',
    })
    .end();
  
  response.assertStatus(201)
  assert.exists(response.body.id);
});

test("it should be able to list orders", async ({assert, client})=>{
  const user = await Factory.model('App/Models/User').create( );
  const order = await Factory.model('App/Models/Order').make();

  await user.orders().save(order);
  const response = await client
    .get('/order')
    .end()

  response.assertStatus(200)
  
  assert.equal(response.body[0].zipcode, order.zipcode)
  assert.equal(response.body[0].user.id, user.id)
})

test("it should be able to show orders", async ({assert, client})=>{
  const user = await Factory.model('App/Models/User').create( );
  const order = await Factory.model('App/Models/Order').make();

  await user.orders().save(order);

  const response = await client
    .get(`/order/${order.id}`)
    .end()

  response.assertStatus(200)
  
  assert.equal(response.body.zipcode, order.zipcode)
  assert.equal(response.body.user.id, user.id)
})

test("it should be able to delete order", async ({assert, client})=>{
  
  const sessionPayLoad = {
    id: 1,
  };
  const orderPayLoad = {
    user_id: sessionPayLoad.id,
  };
  await Factory.model('App/Models/User').create( sessionPayLoad);
  const order = await Factory.model('App/Models/Order').create(orderPayLoad);
  const response = await client
    .delete(`/order/${order.id}`)
    .end()

  response.assertStatus(204)
  const checkOrder = await Order.find(order.id)  
  
  assert.isNull(checkOrder)

})
