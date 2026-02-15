const express = require('express');

const auth = require('./auth.routes');
const profile = require('./profile.routes');
const upload = require('./upload.routes');
const jobs = require('./job.routes');
const applications = require('./application.routes');

const router = express.Router();

router.use('/auth', auth);
router.use('/profile', profile);
router.use('/upload', upload);
router.use('/jobs', jobs);
router.use('/applications', applications);

router.get('/health', (req, res) => res.json({ ok: true }));

module.exports = router;
