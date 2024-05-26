import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './TaskListPage.css'
const TaskListPage = () => {
    const navigate = useNavigate();
    const [taskArray, setTaskArray] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [checked, setChecked] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '-');
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const updatedTasks = await axios.get('http://localhost:8000/');
                const data = updatedTasks.data;
                setTaskArray(data['fetchedTasks']);
                setChecked(data['fetchedChecked']);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        const handleToggle = (id) => () => {
            const currentIndex = checked.indexOf(id);
            const newChecked = [...checked];

            if (currentIndex === -1) {
                newChecked.push(id);
            } else {
                newChecked.splice(currentIndex, 1);
            }
            const updateCheck = async () => {
                await axios.post('http://localhost:8000/tasks/checkTask', { checked: newChecked });
            }

            updateCheck();
            setChecked(newChecked);
        };

        const handleSave = async (id) => {
            try {
                await axios.patch(`http://localhost:8000/tasks/${id}`, { title: editingTitle });
                const updatedTasks = await axios.get('http://localhost:8000/');
                setTaskArray(updatedTasks.data['fetchedTasks']);
                setEditingTaskId(null);
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }

        if (taskArray) {
            const new_tasks = taskArray.map((task, index) => (
                <ListItem
                    key={task.id}
                    secondaryAction={
                        <Stack direction="row" spacing={2}>
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(task.id)}
                                checked={checked.indexOf(task.id) !== -1}
                                inputProps={{ 'aria-labelledby': task.id }}
                            />
                            <IconButton onClick={() => handleDelete(task.id)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    }
                    disablePadding
                >
                    <ListItemButton onClick={() => handleEdit(task.id, task.title)}>
                        {editingTaskId === task.id ? (
                            <TextField
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                onBlur={() => handleSave(task.id)}
                                autoFocus
                            />
                        ) : (
                            <ListItemText
                                id={task.id}
                                primary={task.title}
                                secondary={
                                    <>
                                        {task.description && <div>{task.description}</div>}
                                        {task.dueDate && <div>Due: {formatDate(task.dueDate)}</div>}
                                    </>
                                }
                            />
                        )}
                    </ListItemButton>
                </ListItem>
            ));
            setTasks(new_tasks);
        }
    }, [taskArray, checked, editingTaskId, editingTitle]);

    const handleDelete = (id) => {
        const fetchData = async () => {
            try {
                await axios.delete(`http://localhost:8000/tasks/${id}`);
                const updatedTasks = await axios.get('http://localhost:8000/');
                const data = updatedTasks.data;
                setTaskArray(data['fetchedTasks']);
                setChecked(data['fetchedChecked']);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
        fetchData();
    }

    const handleAdd = () => {
        navigate('/task-form');
    }

    const handleEdit = (id, title) => {
        setEditingTaskId(id);
        setEditingTitle(title);
    }


    return (
        <div className='container'>
            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', border: '1px solid black', padding: '10px', borderRadius: '8px' }}>
                {tasks}
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ margin: '10px' }}>
                    <Button variant="outlined" startIcon={<Add />} onClick={handleAdd}>
                        Create New Task
                    </Button>
                </Stack>
            </List>

        </div>
    );
}

export default TaskListPage;
