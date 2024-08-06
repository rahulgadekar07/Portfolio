const express = require('express');
const router = express.Router();
const { addSkill, getSkills } = require('../controllers/skillsController');

// Route to get skills
router.get('/skills', getSkills);

// Route to add a skill with file upload
router.post('/skills', addSkill);

module.exports = router;
