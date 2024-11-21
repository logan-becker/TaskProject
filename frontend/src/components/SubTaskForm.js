import React, { useState } from 'react';
import { createSubtask } from '../services/TaskServices';

const SubtaskForm = ({ taskId, onSubtaskAdded }) => {
  const [title, setTitle] = useState('');
  const [isCompleted, setCompleted] = useState(false);

  // Handle subtask form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const subtaskData = {
      title,
      is_completed: isCompleted,
    };

    createSubtask(taskId, subtaskData)
      .then(() => {
        // Clear form fields
        setTitle('');
        setCompleted(false);
        // Notify parent component to refresh the task list
        onSubtaskAdded();
      })
      .catch((error) => console.error('Error creating subtask:', error));
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
      transition: 'background-color 0.2s ease',
    },
    buttonHover: {
      backgroundColor: '#2563eb',
    },
  };

  return (
    <div style={styles.formCard}>
      <form onSubmit={handleSubmit}>
        <h3 style={styles.title}>Create Subtask</h3>

        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setCompleted(e.target.checked)}
              id="is-complete"
            />
            <label htmlFor="is-complete" style={styles.label}>
              Mark as completed
            </label>
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
          Add Subtask
        </button>
      </form>
    </div>
  );
};

export default SubtaskForm;
