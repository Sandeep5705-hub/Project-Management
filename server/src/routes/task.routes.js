const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getProjectTasks);
router.post('/quick-submit', auth, taskController.quickSubmit);
router.post('/:id/submit', auth, taskController.submitWork);
router.patch('/:id', auth, taskController.updateTaskStatus);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
