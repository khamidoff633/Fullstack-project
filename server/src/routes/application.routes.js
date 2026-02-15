const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const appc = require('../controllers/application.controller');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');
const { requireProfileCompleted } = require('../middleware/profile.middleware');

const router = express.Router();

router.post('/jobs/:jobId/apply', requireAuth, requireRole('candidate', 'admin'), requireProfileCompleted(), asyncHandler(appc.apply));
router.get('/me', requireAuth, requireRole('candidate', 'admin'), asyncHandler(appc.my));

module.exports = router;
