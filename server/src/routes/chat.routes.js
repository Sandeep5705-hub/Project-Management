const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const auth = require('../middleware/auth');

router.post('/', auth, chatController.sendMessage); // Changed from /send to / for ProjectChat.jsx
router.get('/:projectId', auth, chatController.getProjectMessages);

module.exports = router;
