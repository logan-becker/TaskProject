import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function for registering a user
  const registerAccount = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    try {
      // const response = await axios.post('http://localhost:8000/accounts/register/', userData);
      const response = await axios.post('https://taskproject-tthz.onrender.com/accounts/register/', userData);

      if (response.status === 201) {
        alert('User successfully registered');
        setEmail('');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error('There was an error registering the user!', error);
      alert('Failed to register. Please check the details and try again.');
    }
  };

  // Styles
  const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f4f4',
    },
    formContainer: {
      width: '100%',
      maxWidth: '400px',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    label: {
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
      display: 'block',
    },
    input: {
      width: '100%',
      height: '40px',
      marginBottom: '15px',
      padding: '10px',
      border: '1px solid #ced4da',
      borderRadius: '5px',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box',
    },
    button: {
      backgroundImage: 'linear-gradient(to right, #4facfe, #00f2fe)',
      color: '#007bff',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
      width: '100%',
      fontSize: '16px',
      fontSize: '1rem',
      fontWeight: '600',
      border: 'none'

    },
    linkContainer: {
      textAlign: 'center',
      marginTop: '15px',
    },
    link: {
      textDecoration: 'none',
      color: '#007bff',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <Form onSubmit={registerAccount}>
          <Form.Group controlId="usernameInput">
            <Form.Label style={styles.label}>Username</Form.Label>
            <input
              type="text"
              placeholder="Enter username"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="emailInput">
            <Form.Label style={styles.label}>Email</Form.Label>
            <input
              type="email"
              placeholder="Enter email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="passwordInput">
            <Form.Label style={styles.label}>Password</Form.Label>
            <input
              type="password"
              placeholder="Enter password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" style={styles.button}>
            Register
          </Button>
        </Form>
        <div style={styles.linkContainer}>
          <p>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
