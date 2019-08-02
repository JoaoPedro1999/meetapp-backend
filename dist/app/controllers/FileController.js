function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
Object.defineProperty(exports, '__esModule', { value: true });
const _File = require('../models/File');

const _File2 = _interopRequireDefault(_File);

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await _File2.default.create({
      name,
      path,
    });

    return res.json(file);
  }
}

exports.default = new FileController();
