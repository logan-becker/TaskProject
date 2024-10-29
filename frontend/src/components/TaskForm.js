import React, { useState } from 'react';
import { createTask } from '../services/TaskServices.js';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pubDate, setPubDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      pub_date: pubDate,
      is_completed: isCompleted,
    };

    createTask(taskData)
      .then(() => {
        // Clear form fields
        setTitle('');
        setDescription('');
        setPubDate('');
        setIsCompleted(false);
        // Notify parent component to refresh the task list
        onTaskAdded();
      })
      .catch((error) => console.error('Error creating task:', error));
  };

  const styles = {
    form: {
      margin: '0 auto',
      padding: '24px',
      background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      marginBottom: '20px'
    },
    title: {
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '24px',
      color: '#111827'
    },
    formGroup: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: '16px',
      gap: '10px'
    },
    label: {
      width: '120px',
      textAlign: 'right',
      fontSize: '0.95rem',
      color: '#374151',
      fontWeight: '500'
    },
    inputWrapper: {
      flex: 1,
      width: '220px'
    },
    input: {
      width: '25%',
      padding: '8px 12px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '0.95rem',
      transition: 'border-color 0.2s ease',
      outline: 'none',
      ':focus': {
        borderColor: '#60a5fa',
        boxShadow: '0 0 0 2px rgba(96, 165, 250, 0.1)'
      }
    },
    textarea: {
      width: '50%',
      padding: '8px 12px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '0.95rem',
      minHeight: '100px',
      resize: 'vertical',
      transition: 'border-color 0.2s ease',
      outline: 'none',
      ':focus': {
        borderColor: '#60a5fa',
        boxShadow: '0 0 0 2px rgba(96, 165, 250, 0.1)'
      }
    },
    checkbox: {
      width: '16px',
      height: '16px',
      cursor: 'pointer'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '24px'
    },
    button: {
      backgroundColor: '#60a5fa',
      color: 'white',
      padding: '10px 24px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '0.95rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#3b82f6'
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Create New Task</h2>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Title:</label>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Description:</label>
        <div style={styles.inputWrapper}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.textarea}
          ></textarea>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Publish Date:</label>
        <div style={styles.inputWrapper}>
          <input
            type="date"
            value={pubDate}
            onChange={(e) => setPubDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Is Completed:</label>
        <div style={styles.inputWrapper}>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
            style={styles.checkbox}
          />
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button type="submit" style={styles.button}>
          Create Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
