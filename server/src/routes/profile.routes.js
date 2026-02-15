const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const profile = require('../controllers/profile.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', requireAuth, asyncHandler(profile.create));
router.get('/me', requireAuth, asyncHandler(profile.me));
router.patch('/me', requireAuth, asyncHandler(profile.updateMe));
router.get('/:username', asyncHandler(profile.getByUsername));

module.exports = router;
