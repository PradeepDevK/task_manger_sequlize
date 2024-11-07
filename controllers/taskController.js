const { Task } = require('../models');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({
            title,
            description,
            userId: req.user.id
        });

        res.status(201).json({ message: 'Task Created Successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task', error });
    }
};

//get all task
exports.getTasks = async (req, res) => {
    try {
        const tasks = req.user.role === 'admin'
            ? await Task.findAll({})
            : await Task.findAll({ where: { userId: req.user.id } });

        res.status(200).json(tasks);
    } catch(error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
};

// update a task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied' });
        }

        const updatedTask = await task.update(req.body);
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch(error) {
        res.status(500).json({ message: 'Failed to update task', error });
    }
};

// delete a task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found.' });
        if (task.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error });
    }
};