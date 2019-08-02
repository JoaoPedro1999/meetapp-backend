"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _datefns = require('date-fns');
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Meetup extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        title: _sequelize2.default.STRING,
        description: _sequelize2.default.STRING,
        location: _sequelize2.default.STRING,
        date: _sequelize2.default.DATE,
        past: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return _datefns.isBefore.call(void 0, this.date, new Date());
          },
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Subscription, { foreignKey: 'meetup_id' });
    this.belongsTo(models.File, { foreignKey: 'file_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

exports. default = Meetup;
