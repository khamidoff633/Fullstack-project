const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { requireAuth } = require('../middleware/auth.middleware');
const { uploadAvatar, uploadCover, uploadResume, uploadCompanyLogo } = require('../middleware/upload.middleware');
const upload = require('../controllers/upload.controller');

const router = express.Router();

router.post('/avatar', requireAuth, uploadAvatar.single('file'), asyncHandler(upload.uploadSingle));
router.post('/cover', requireAuth, uploadCover.single('file'), asyncHandler(upload.uploadSingle));
router.post('/resume', requireAuth, uploadResume.single('file'), asyncHandler(upload.uploadSingle));
router.post('/company-logo', requireAuth, uploadCompanyLogo.single('file'), asyncHandler(upload.uploadSingle));

module.exports = router;
