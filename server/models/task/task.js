const { v4: uuidv4 } = require('uuid');

class ToDoItem {
    constructor(title, done = false, dueDate = null, description = null) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.done = done;
        this.dueDate = dueDate ? new Date(dueDate) : null;
    }
}

module.exports = ToDoItem;
