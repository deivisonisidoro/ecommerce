const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Mail = use('Mail');
const Env = use('Env');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class ForgotPasswordController {
  async store({ request }) {
    const email = request.input('email');

    const user = await User.findByOrFail('email', email);

    const radom = await promisify(randomBytes)(24);
    const token = radom.toString('hex');

    await user.tokens().create({
      token,
      type: 'forgotPassword',
    });

    const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;

    await Mail.send(
      'emails.forgotPassword',
      { username: user.username, resetPasswordUrl },
      (message) => {
        message
          .to(user.email)
          .from('deivisonisidoro@hotmail.com')
          .subject('Recuperação de senha ');
      }
    );
  }
}

module.exports = ForgotPasswordController;
