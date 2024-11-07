const express = require('express');
const { createTask, updateTask, getTasks, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin', 'user']), createTask);
router.get('/', authMiddleware, roleMiddleware(['admin', 'user']), getTasks);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'user']), updateTask);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'user']), deleteTask);

module.exports = router;