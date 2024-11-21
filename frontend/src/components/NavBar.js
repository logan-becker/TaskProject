import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    console.log('User Logged Out');
    // Navigate to login after logout logic completes
    navigate('/login');
  };

  const styles = {
    navbar: {
      backgroundImage: 'linear-gradient(to right, #4facfe, #00f2fe)',
      padding: '1em',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navList: {
      listStyle: 'none',
      display: 'flex',
      gap: '1em',
      margin: 0,
      padding: 0,
    },
    navItem: {
      textDecoration: 'none',
      color: 'white',
      fontWeight: '600',
    },
    brand: {
      fontWeight: '600',
      color: 'white',
    },
  };

  return (
    <nav style={styles.navbar}>
      <span style={styles.brand}>Tasks</span>
      <ul style={styles.navList}>
        {isAuthenticated ? (
          <>
            <li>
              {/* Replace Link with a button for logout */}
              <button
                onClick={handleLogout}
                style={{
                  ...styles.navItem,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" style={styles.navItem}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" style={styles.navItem}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
