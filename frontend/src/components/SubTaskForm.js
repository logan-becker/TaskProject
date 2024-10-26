// // SubtaskForm.js

// import React, { useState } from 'react';
// import { createSubtask } from '../services/TaskServices';

// const SubtaskForm = ({ taskId, onSubtaskAdded }) => {
//   const [title, setTitle] = useState('');

//   // Handle subtask form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const subtaskData = {
//       title,
//     };

//     createSubtask(taskId, subtaskData)
//       .then(() => {
//         // Clear form fields
//         setTitle('');
//         // Notify parent component to refresh the task list
//         onSubtaskAdded();
//       })
//       .catch((error) => console.error('Error creating subtask:', error));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Create Subtask</h3>
//       <div>
//         <label>Title:</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Add Subtask</button>
//     </form>
//   );
// };

// export default SubtaskForm;
