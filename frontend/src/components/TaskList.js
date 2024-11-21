import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/TaskServices';
import TaskForm from './TaskForm';
import SubtaskForm from './SubTaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    getTasks()
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks: ", error));
  };

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
      maxWidth: '800px',
      margin: '0 auto',
      padding: '24px',
    },
    taskCard: {
      maxWidth: '600px',
      margin: '16px auto',
      padding: '20px',
      background: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
        
    },
    taskTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '8px',
      color: '#111827',
    },
    taskDescription: {
      color: '#4b5563',
      marginBottom: '8px',
      fontSize: '1rem',
    },
    taskDate: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '8px',
    },
    checkbox: {
      fontSize: '1rem',
      color: '#374151',
      marginBottom: '16px',
    },
    deleteButton: {
      padding: '8px 16px',
      fontSize: '0.875rem',
      color: '#dc2626',
      border: '1px solid #fecaca',
      borderRadius: '6px',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      width: '35%', // Set width to 35%
      margin: '16px auto 0', // Center the button horizontally
      display: 'block', // Ensures it behaves as a block-level element
    },
        deleteButtonHover: {
      backgroundColor: '#fee2e2',
    },
    subtaskHeader: {
      fontSize: '1.25rem',
      fontWeight: '500',
      marginBottom: '12px',
    },
    subtaskList: {
      padding: '0',
      margin: '0',
      listStyle: 'none',
    },
    subtaskItem: (isCompleted) => ({
      padding: '12px',
      marginBottom: '8px',
      borderRadius: '6px',
      backgroundColor: isCompleted ? '#f0fdf4' : '#fef2f2',
      border: `1px solid ${isCompleted ? '#bbf7d0' : '#fecaca'}`,
      fontSize: '0.875rem',
    }),
  };

  return (
    <div style={styles.container}>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.taskCard}>
            <h2 style={styles.taskTitle}>{task.title}</h2>
            <p style={styles.taskDescription}>{task.description}</p>
            <p style={styles.taskDate}>Published on: {task.pub_date}</p>
            <p style={styles.checkbox}>
              Completed? - {task.is_completed ? 'Yes' : 'No'}
            </p>
            {/* Display Subtasks */}
            {task.subtasks && task.subtasks.length > 0 && (
              <div>
                <h3 style={styles.subtaskHeader}>Subtasks:</h3>
                <ul style={styles.subtaskList}>
                  {task.subtasks.map((subtask) => (
                    <li
                      key={subtask.id}
                      style={styles.subtaskItem(subtask.is_completed)}
                    >
                      {subtask.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Subtask Form */}
            <SubtaskForm taskId={task.id} onSubtaskAdded={fetchTasks} />
            <button
              style={styles.deleteButton}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = styles.deleteButtonHover.backgroundColor)
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = 'transparent')
              }
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;