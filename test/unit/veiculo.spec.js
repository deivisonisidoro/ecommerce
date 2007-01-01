const { test, trait } = use('Test/Suite')('Veiculo');


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Veiculo');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const Helpers = use('Helpers');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should able to create veiculo', async ({
  assert,
  client,
}) => {
    const sessionPayLoad = {
      veiculo: "Veiculo1",
      marca: 'Marca1',
      ano: 2020,
      descricao: 'Eu estou testando um texto',
      vendido: true,
    };
  
   await Factory.model('App/Models/Veiculo').create(sessionPayLoad);


  const response = await client
    .post('/veiculos')
    .send({
      veiculo: "Veiculo1",
      marca: 'Marca1',
      ano: 2020,
      descricao: 'Eu estou testando um texto',
      vendido: true,
    })
    .end();
  
  response.assertStatus(201)
  assert.exists(response.body.id);
});

/*
test("it should be able to list product", async ({assert, client})=>{

  const order = await Factory.model('App/Models/Product').make();

  
  const response = await client
    .get('/product')
    .end()

  response.assertStatus(200)
  
  assert.equal(response.body.id, order.id)
  
})

test("it should be able to show product", async ({assert, client})=>{
    const product = await Factory.model('App/Models/Product').create();

    
    const response = await client
      .get(`/product/${product.id}`)
      .end()
  
    response.assertStatus(200)
    
    assert.equal(response.body.name, product.name)
})

test("it should be able to update product", async ({assert, client})=>{
    const product = await Factory.model('App/Models/Product').create();

    
    const response = await client
      .put(`/product/${product.id}`)
      .send({
        name: "Product1",
        type: "Comestivel" ,
        description: "Texto do produto",
        price:"R$00,00"
      })
      .end()
  
    response.assertStatus(200)
    
    assert.equal(response.body.id, product.id)
})

test("it should be able to delete product", async ({assert, client})=>{
  const product = await Factory.model('App/Models/Product').create();

  
  const response = await client
    .delete(`/product/${product.id}`)
    .end()

  response.assertStatus(204)
  const checkProduct = await Product.find(product.id)  
  
  assert.isNull(checkProduct)
})

/*test("it should be able to update image", async ({assert, client})=>{
    
  const product = await Factory.model('App/Models/Product').create();

    
  const response = await client
    .put(`/upload`)
    .attach('user_img', Helpers.tmpPath('test/product_img.png'))
    .end()

  response.assertStatus(200)
  
  assert.equal(response.body.user_img)
})*/