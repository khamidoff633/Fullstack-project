const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const job = require('../controllers/job.controller');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');
const { requireProfileCompleted } = require('../middleware/profile.middleware');

const router = express.Router();

router.get('/', asyncHandler(job.list));
router.get('/:id', asyncHandler(job.getOne));
router.post('/', requireAuth, requireRole('employer', 'admin'), requireProfileCompleted(), asyncHandler(job.create));

module.exports = router;
