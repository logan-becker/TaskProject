import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/TaskServices';
import TaskForm from './TaskForm';
import SubtaskForm from './SubTaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        getTasks()
            .then((response) => setTasks(response.data))
            .catch((error) => console.error("Error fetching tasks: ", error))
    }

    useEffect(() => {
        fetchTasks();
    }, []);
    
    const handleDelete = (taskId) => {
        deleteTask(taskId)
        .then(() => setTasks(tasks.filter((task) => task.id !== taskId)))
        .catch((error) => console.log("Error deleting task: ", error));
    };
    
    const handleTaskAdded = () => {
        fetchTasks();
    };
    return (
        <div>
        <h1>Task List</h1>
        <TaskForm onTaskAdded={handleTaskAdded} />
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>Published on: {task.pub_date}</p>
                    <p>Completed: {task.is_completed ? 'Yes' : 'No'}</p>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                    {/* Display Subtasks */}
                    {task.subtasks && task.subtasks.length > 0 && (
                        <div>
                            <h3>Subtasks:</h3>
                            <ul>
                                {task.subtasks.map((subtask) => (
                                    <li key={subtask.id}>{subtask.title}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* Subtask Form */}
                    {/* <SubtaskForm taskId={task.id} onSubtaskAdded={fetchTasks} /> */}
                </li>
            ))}
        </ul>
    </div>
);
};

export default TaskList;
