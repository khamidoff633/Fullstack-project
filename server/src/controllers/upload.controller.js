const path = require('path');

module.exports = {
  async uploadSingle(req, res) {
    // multer puts file in req.file
    const f = req.file;
    if (!f) return res.status(400).json({ message: 'File is required' });

    const url = `/uploads/${f.filename}`;
    return res.status(201).json({ url, filename: f.filename, mimetype: f.mimetype, size: f.size });
  },
};
