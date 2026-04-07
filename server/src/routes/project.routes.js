const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const auth = require('../middleware/auth');

router.post('/', auth, projectController.createProject);
router.post('/join', auth, projectController.joinProject);
router.get('/my-projects', auth, projectController.getMyProjects);
router.get('/:id', auth, projectController.getProjectById);
router.get('/:id/members', auth, projectController.getProjectMembers);
router.patch('/:id/remarks', auth, projectController.addRemarks);

module.exports = router;
