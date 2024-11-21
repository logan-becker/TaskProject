import React, { useState } from 'react';
import { createTask } from '../services/TaskServices.js';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pubDate, setPubDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

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
        setTitle('');
        setDescription('');
        setPubDate('');
        setIsCompleted(false);
        onTaskAdded();
      })
      .catch((error) => console.error('Error creating task:', error));
  };

  const styles = {
    formCard: {
      maxWidth: '600px',
      margin: '16px auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
    },
    title: {
      textAlign: 'center',
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#111827',
    },
    formGroup: {
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      color: '#374151',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      outline: 'none',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      outline: 'none',
      boxSizing: 'border-box',
      resize: 'vertical',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    button: {
      display: 'block',
      width: '100%',
      padding: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#ffffff',
      backgroundImage: 'linear-gradient(to right, #4facfe, #00f2fe)',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.6s ease',
    },
    buttonHover: {
      backgroundColor: '#2563eb',
    },
  };

  return (
    <div style={styles.formCard}>
      <form onSubmit={handleSubmit}>
        {/* <h2 style={styles.title}>Create New Task</h2> */}

        <div style={styles.formGroup}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.textarea}
          ></textarea>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Publish Date</label>
          <input
            type="date"
            value={pubDate}
            onChange={(e) => setPubDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
            <label style={styles.label}>Task Complete?</label>
          </div>
        </div>

        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Create New Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
