const ToDoItem = require('./models/task/task');
const asyncHandler = require("express-async-handler");

class ToDoService {
    constructor() {
        this.tasks = [];
        this.checked = []
    }

    createTask = asyncHandler(async (req, res, next) => {
        try {
            const { title, done, dueDate, description } = req.body;
            const task = new ToDoItem(title, done, dueDate, description);
            this.tasks.push(task);
            if (done === 'Complete') {
                this.checked.push(task.id)
            }
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating the task.' });
        }
    });

    getAllTasks = asyncHandler(async (req, res, next) => {
        try {
            res.json({ fetchedTasks: this.tasks, fetchedChecked: this.checked });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving tasks.' });
        }
    });

    getTaskById = asyncHandler(async (req, res, next) => {
        try {
            const task = this.tasks.find(task => task.id === req.params.id);
            if (task) {
                res.json(task);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while retrieving the task.' });
        }
    });

    updateTask = asyncHandler(async (req, res, next) => {
        try {
            const task = this.tasks.find(task => task.id === req.params.id);
            if (task) {
                Object.assign(task, req.body);
                res.json(task);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while updating the task.' });
        }
    });

    deleteTask = asyncHandler(async (req, res, next) => {
        try {
            const index = this.tasks.findIndex(task => task.id === req.params.id);
            if (index !== -1) {
                const deletedTask = this.tasks.splice(index, 1)[0];
                const checkedIndex = this.checked.indexOf(req.params.id)
                if (checkedIndex != -1) {
                    this.checked.splice(checkedIndex, 1)
                }


                res.json(deletedTask);
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the task.' });
        }
    });

    checkedTask = asyncHandler(async (req, res, next) => {
        try {
            this.checked = req.body.checked
            res.json(this.tasks);
        }
        catch (error) {
            res.status(500).json({ error: 'An error occurred while checking the task.' });

        }
    });
}

module.exports = ToDoService;
