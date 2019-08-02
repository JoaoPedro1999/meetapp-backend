"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _MeetupController = require('./app/controllers/MeetupController'); var _MeetupController2 = _interopRequireDefault(_MeetupController);
var _OrganizingController = require('./app/controllers/OrganizingController'); var _OrganizingController2 = _interopRequireDefault(_OrganizingController);
var _SubscriptionController = require('./app/controllers/SubscriptionController'); var _SubscriptionController2 = _interopRequireDefault(_SubscriptionController);

var _MeetupStore = require('./app/validators/MeetupStore'); var _MeetupStore2 = _interopRequireDefault(_MeetupStore);

const routes = new (0, _express.Router)();

const upload = _multer2.default.call(void 0, _multer4.default);

routes.post('/users', _UserController2.default.store);
routes.post('/sessions', _SessionController2.default.store);

routes.use(_auth2.default);

routes.post('/files', upload.single('file'), _FileController2.default.store);

routes.put('/users', _UserController2.default.update);

routes.get('/meetups', _MeetupController2.default.index);
routes.post('/meetups', _MeetupStore2.default, _MeetupController2.default.store);
routes.put('/meetups/:id', _MeetupController2.default.update);
routes.delete('/meetups/:id', _MeetupController2.default.delete);

routes.get('/organizing', _OrganizingController2.default.index);
routes.get('/subscriptions', _SubscriptionController2.default.index);

routes.post('/meetups/:meetupId/subscriptions', _SubscriptionController2.default.store);

exports. default = routes;
