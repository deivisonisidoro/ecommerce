/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    username: faker.name(),
    email: faker.email(),
    password: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => {
  return {
    type: data.type || 'refreshtoken',
    token: faker.string({ length: 20 }),
    ...data,
  };

});

Factory.blueprint('App/Models/Product', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    type: faker.string(),
    description: faker.paragraph(),
    price:faker.string(),
    ...data,
  };

});
Factory.blueprint('App/Models/Order', (faker, i, data = {})=>{
  return {

    zipcode: faker.string(),
    street: faker.name(),
    number: faker.string(),
    city: faker.name(),
    state: faker.name(),
    ...data,
  };
})
