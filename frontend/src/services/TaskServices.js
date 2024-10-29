import axios from 'axios';

// const API_URL = 'https://taskproject-tthz.onrender.com/tasks/api/tasks/';
const API_URL = 'http://localhost:8000/tasks/api/tasks/';


export const getTasks = () => axios.get(API_URL);

export const createTask = (taskData) => axios.post(API_URL, taskData);

export const deleteTask = (taskId) => axios.delete(`${API_URL}${taskId}/`);

export const createSubtask = (taskId, subtaskData) =>
  axios.post(`${API_URL}${taskId}/add_subtask/`, subtaskData);
