"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await _Mail2.default.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: `[${meetup.title}] Nova inscrição`,
      template: 'subscription',
      context: {
        organizer: meetup.User.name,
        meetup: meetup.title,
        user: user.name,
        email: user.email,
      },
    });
  }
}

exports. default = new SubscriptionMail();
