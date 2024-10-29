// SubtaskForm.js

import React, { useState } from 'react';
import { createSubtask } from '../services/TaskServices';

const SubtaskForm = ({ taskId, onSubtaskAdded }) => {
    const [title, setTitle] = useState('')
    const [is_completed, setCompleted] = useState(false)

    // Handle subtask form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const subtaskData = {
            title,
            is_completed
        };

        createSubtask(taskId, subtaskData)
            .then(() => {
                // Clear form fields
                setTitle('');
                // Notify parent component to refresh the task list
                onSubtaskAdded();
            })
            .catch((error) => console.error('Error creating subtask:', error));
    };


    const styles = {
      form: {
        padding: '24px',
        marginBottom: '24px',
        background: 'linear-gradient(to bottom, #ffffff, #b3e0ff)',
        borderRadius: '8px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb'
      },
      addSubtaskButton: {
        backgroundColor: '#60a5fa',
        color: 'white',
        padding: '8px 24px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.95rem',
        transition: 'background-color 0.2s ease',
        marginTop: '8px',
        ':hover': {
          backgroundColor: '#3b82f6'
        },
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
      }
    };
    
                  
    
    

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3>Create Subtask</h3>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="checkbox"
                    id="is-complete"
                />
                <label htmlFor="is-complete">
                    Mark as completed
                </label>

            </div>
            <button type="submit" style={styles.addSubtaskButton}>Add Subtask</button>
        </form>
    );
};

export default SubtaskForm;
