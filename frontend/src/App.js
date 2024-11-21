import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import Navbar from './components/NavBar';
import Login from './components/AuthComponents/Login';
import Register from './components/AuthComponents/Register';
import TaskList from './components/TaskList';
import Profile from './components/User/profile';

const AppContent = () => {
  // Access `isAuthenticated` from Redux state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* If the user is NOT authenticated */}
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/* If the user IS authenticated */}
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/tasks" />} />
          </>
        )}
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
