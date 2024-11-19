// Profile.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice.js';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <h2>Welcome</h2>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Profile;
