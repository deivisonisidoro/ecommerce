const { test, trait } = use('Test/Suite')('Forgot');

const { subHours, format, subMinutes } = require('date-fns');

const Mail = use('Mail');
const Hash = use('Hash');
const Database = use('Database');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should send an email with reset forgot password instructions', async ({
  assert,
  client,
}) => {
  Mail.fake();

  const email = 'deivisonisidoro@gmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  await client.post('/forgot').send({ email }).end();

  const token = await user.tokens().first();

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, email);

  assert.include(token.toJSON(), {
    type: 'forgotPassword',
  });

  Mail.restore();
});

test('it should  be  able to reset password', async ({ client, assert }) => {
  const email = 'deivisonisidoro@gmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456',
    })
    .end();

  response.assertStatus(204);

  await user.reload();
  const checkPassword = await Hash.verify('123456', user.password);

  assert.isTrue(checkPassword);
});

test('it connot reset password after 2h of forgot password request', async ({
  client,
}) => {
  const email = 'deivisonisidoro@gmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);

  const dateWithSub = format(subMinutes(subHours(new Date(), 2), 10), 'yyyy-MM-dd HH:ii:ss');

  await Database.table('tokens')
    .where('token', userToken.token)
    .update('created_at', dateWithSub);

  await userToken.reload();

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456',
    })
    .end();

  response.assertStatus(400);
});
