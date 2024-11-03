import axios from 'axios';

const apiUrl = (process.env.REACT_APP_API_URL || 'https://taskproject-tthz.onrender.com/tasks/api/tasks/'
)


export const getTasks = () => axios.get(apiUrl);

export const createTask = (taskData) => axios.post(apiUrl, taskData);

export const deleteTask = (taskId) => axios.delete(`${apiUrl}${taskId}/`);

export const createSubtask = (taskId, subtaskData) =>
  axios.post(`${apiUrl}${taskId}/add_subtask/`, subtaskData);

// user auth service