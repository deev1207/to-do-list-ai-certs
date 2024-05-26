// Task.js
import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import axios from 'axios';


const Task = ({ id, title, done, dueDate, deleteTask }) => {
    const handleDelete = async () => {
        await axios.delete(`http://localhost:8000/tasks/${id}`)
        deleteTask()
    }
    return (
        <div className="task">
            <h3>Title: {title}</h3>
            <p>Status: {done}</p>
            <p>Due Date: {dueDate}</p>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>
                    Delete
                </Button>
            </Stack>
        </div>
    );
}

export default Task;
