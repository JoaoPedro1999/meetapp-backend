"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Meetup = require('../models/Meetup'); var _Meetup2 = _interopRequireDefault(_Meetup);

class OrganizingController {
  async index(req, res) {
    const meetups = await _Meetup2.default.findAll({ where: { user_id: req.userId } });

    return res.json(meetups);
  }
}

exports. default = new OrganizingController();
