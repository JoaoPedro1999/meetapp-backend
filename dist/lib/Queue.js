"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _beequeue = require('bee-queue'); var _beequeue2 = _interopRequireDefault(_beequeue);
var _node = require('@sentry/node'); var Sentry = _interopRequireWildcard(_node);
var _sentry = require('../config/sentry'); var _sentry2 = _interopRequireDefault(_sentry);
var _SubscriptionMail = require('../app/jobs/SubscriptionMail'); var _SubscriptionMail2 = _interopRequireDefault(_SubscriptionMail);

Sentry.init(_sentry2.default);

const jobs = [_SubscriptionMail2.default];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new (0, _beequeue2.default)(key, {
          redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
          },
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Queue ${job.queue.name}: FAILED`, err);
    }

    Sentry.captureException(err);
  }
}

exports. default = new Queue();
