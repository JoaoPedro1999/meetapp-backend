"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

class Subscription extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Meetup, { foreignKey: 'meetup_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

exports. default = Subscription;
