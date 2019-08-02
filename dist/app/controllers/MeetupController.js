function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  const newObj = {};
  if (obj != null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  return newObj;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
Object.defineProperty(exports, '__esModule', { value: true });
const _yup = require('yup');

const Yup = _interopRequireWildcard(_yup);
const _sequelize = require('sequelize');
const _datefns = require('date-fns');
const _Meetup = require('../models/Meetup');

const _Meetup2 = _interopRequireDefault(_Meetup);
const _User = require('../models/User');

const _User2 = _interopRequireDefault(_User);

class MeetupController {
  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;

    if (req.query.date) {
      const searchDate = _datefns.parseISO.call(void 0, req.query.date);

      where.date = {
        [_sequelize.Op.between]: [
          _datefns.startOfDay.call(void 0, searchDate),
          _datefns.endOfDay.call(void 0, searchDate),
        ],
      };
    }

    const meetups = await _Meetup2.default.findAll({
      where,
      include: [
        {
          model: _User2.default,
          attributes: ['id', 'name'],
        },
      ],
      limit: 10,
      offset: 10 * page - 10,
    });

    return res.json(meetups);
  }

  async store(req, res) {
    if (
      _datefns.isBefore.call(
        void 0,
        _datefns.parseISO.call(void 0, req.body.date),
        new Date()
      )
    ) {
      return res.status(400).json({ error: 'Meetup date invalid' });
    }

    const user_id = req.userId;

    const meetup = await _Meetup2.default.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      file_id: Yup.number(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user_id = req.userId;

    const meetup = await _Meetup2.default.findByPk(req.params.id);

    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    if (
      _datefns.isBefore.call(
        void 0,
        _datefns.parseISO.call(void 0, req.body.date),
        new Date()
      )
    ) {
      return res.status(400).json({ error: 'Meetup date invalid' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't update past meetups." });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const user_id = req.userId;

    const meetup = await _Meetup2.default.findByPk(req.params.id);

    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups." });
    }

    await meetup.destroy();

    return res.send();
  }
}

exports.default = new MeetupController();
