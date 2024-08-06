//projectRoutes.js (path:D:\Soft Skills\New folder\backend\routes\projectRoutes.js)
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/projects', projectController.getProjects);
router.post('/projects', projectController.addProject);

module.exports = router;
