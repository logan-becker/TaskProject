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

    const styles = {
        container: {
          padding: '24px',
          marginBottom: '24px',
          borderRadius: '8px',
          boxShadow: '4px 0 6px -6px rgba(0,0,0,0.3), -4px 0 6px -6px rgba(0,0,0,0.3), 0 -4px 6px -6px rgba(0,0,0,0.3)',
          border: '1px solid #e5e7eb',
          borderBottom: 'none',
        },
        title: {
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '16px'
        },
        form: {
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        },
        input: {
          width: '100%',
          padding: '8px',
          border: '1px solid black',
          borderRadius: '6px',
          outline: 'none',
        },
        button: {
          backgroundColor: '#60a5fa',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          ':hover': {
            backgroundColor: '#3b82f6'
          }
        },
        'ul': {
            listStyle: 'none',
            padding: 0,
            margin: 0
          },
        deleteButton: {
          marginTop: '16px',
          padding: '4px 12px',
          fontSize: '0.875rem',
          color: '#dc2626',
          border: '1px solid #fecaca',
          borderRadius: '6px',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          ':hover': {
            backgroundColor: '#fee2e2'
          }
        },
        checkbox: {
          marginRight: '8px'
        },
        taskCard: {
          padding: '24px',
          marginBottom: '24px',
          background: 'linear-gradient(to bottom, #ffffff, #f0f0f5)',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          listStyle: 'none',

        },
        taskTitle: {
          fontSize: '1.125rem',
          fontWeight: '600',
          marginBottom: '8px'
        },
        taskDescription: {
          color: '#4b5563',
          marginBottom: '8px'
        },
        taskDate: {
          fontSize: '0.875rem',
          color: '#6b7280',
          marginBottom: '8px'
        },
        statusBadge: (isCompleted) => ({
          display: 'inline-block',
          padding: '4px 8px',
          marginLeft: '8px',
          borderRadius: '4px',
          fontSize: '0.875rem',
          backgroundColor: isCompleted ? '#dcfce7' : '#fee2e2',
          color: isCompleted ? '#166534' : '#991b1b'
        }),
        subtasksList: {
          marginTop: '16px'
        },
        subtaskHeader: {
          fontWeight: '500',
          marginBottom: '8px'
        },
        subtaskItem: (isCompleted) => ({
          padding: '12px',
          marginBottom: '8px',
          borderRadius: '6px',
          backgroundColor: isCompleted ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${isCompleted ? '#bbf7d0' : '#fecaca'}`
        })
      };
      
    return (
        <div style={styles.container}>
        <TaskForm onTaskAdded={handleTaskAdded} />
        <ul style={styles.ul}>
            {tasks.map((task) => (
                <ul key={task.id} style={styles.taskCard}>
                    <h2 style={styles.taskTitle}>{task.title}</h2>
                    <p style={styles.taskDescription}>{task.description}</p>
                    <p style={styles.taskDate}>Published on: {task.pub_date}</p>
                    <p style={styles.checkbox}>Completed: {task.is_completed ? 'Yes' : 'No'}</p>
                    <button style={styles.deleteButton}onClick={() => handleDelete(task.id)}>Delete</button>
                    {/* Display Subtasks */}
                    {task.subtasks && task.subtasks.length > 0 && (
                        <div >
                            <h3 style={styles.subtaskHeader}>Subtasks:</h3>
                            <ul style={styles.ul}>
                                {task.subtasks.map((subtask) => (
                                    <ul key={subtask.id} style={styles.subtaskItem(subtask.is_completed)}>{subtask.title}</ul>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* Subtask Form */}
                    <SubtaskForm taskId={task.id} onSubtaskAdded={fetchTasks} />
                </ul>
            ))}
        </ul>
    </div>
);
};

export default TaskList;
