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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Publish Date:</label>
        <input
          type="date"
          value={pubDate}
          onChange={(e) => setPubDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Is Completed:</label>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
