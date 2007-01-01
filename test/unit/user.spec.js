const { test, trait } = use('Test/Suite')('Session');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should return JTW token when session created', async ({
  assert,
  client,
}) => {
 
  await Factory.model('App/Models/User').create();

  const response = await client
    .post('/register')
    .send({
        username:"deivison",
        email: 'deivison@gmail.com',
        password: '123456',
    })
    .end();

  response.assertStatus(200);
  assert.exists(response.body.id);
});


test("it should be able to list product", async ({assert, client})=>{

    const order = await Factory.model('App/Models/User').create();
  
    
    const response = await client
      .get('/user')
      .end()
  
    response.assertStatus(200)
    
    assert.equal(response.body.id, order.id)
    
  })