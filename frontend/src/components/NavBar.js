import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logout from '../slices/authSlice'


const Navbar = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

  // Access `isAuthenticated` from Redux state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');

    setEmail('');
    setPassword('');

    console.log('User Logged Out')

    navigate('/login');
  };

  // Define style objects
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
    navItemHover: {
      textDecoration: 'underline',
    },
    brand: {
      fontWeight: '600',
      color: 'white',
    },
  };

  console.log("Auth status: " + isAuthenticated)

  return (
    <nav style={styles.navbar}>
      <span style={styles.brand}>Tasks</span>
      <ul style={styles.navList}>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/login" style={styles.navItem} onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" style={styles.navItem} >
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
