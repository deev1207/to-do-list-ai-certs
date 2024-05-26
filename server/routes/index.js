var express = require('express');
var router = express.Router();
const ToDoService = require('../toDoService')
const toDoService = new ToDoService()
/* GET home page. */


// Get all tasks
router.get('/', toDoService.getAllTasks);

// Get a single task by ID
router.get('/tasks/:id', toDoService.getTaskById);

// Create a new task
router.post('/tasks', toDoService.createTask);

// Update an existing task by ID
router.patch('/tasks/:id', toDoService.updateTask);

// Delete a task by ID
router.delete('/tasks/:id', toDoService.deleteTask);
router.post('/tasks/checkTask', toDoService.checkedTask);



module.exports = router;
