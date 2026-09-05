const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { generateQuestions } = require('../controllers/aiController');

router.use(requireAuth);
router.post('/generate-questions', generateQuestions);

module.exports = router;