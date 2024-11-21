import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginSuccess, logout } from '../../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Validate JWT token
    const isTokenValid = (token) => {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000; // Current time in seconds
            return decoded.exp > now; // Token is valid if expiration is in the future
        } catch (error) {
            return false; // Invalid token
        }
    };

    const loginAccount = async (e) => {
        e.preventDefault();

        const loginData = { email, password };

        try {
            // const response = await axios.post('http://localhost:8000/accounts/login/', loginData);
            const response = await axios.post('https://taskproject-tthz.onrender.com/accounts/login/', loginData);


            if (response.status === 200) {
                const { access: token, email } = response.data;

                if (isTokenValid(token)) {
                    dispatch(loginSuccess({ user: { email }, token }));
                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('user', JSON.stringify({ email }));
                    setEmail('');
                    setPassword('');
                    console.log('Dispatching loginSuccess:', { user: { email }, token });
                    navigate('/tasks'); // Navigate after successful login
                } else {
                    console.error('Invalid token');
                }
            }
        } catch (error) {
            dispatch(loginFailure({ error: error.message }));
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        dispatch(logout());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        console.log('User Logged Out');
    };

    console.log('Is Authenticated:', isAuthenticated);

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
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
            width: '100%',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
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
                <Form onSubmit={loginAccount}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={styles.label}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            style={styles.input}
                            size="sm"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else!
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style={styles.label}>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="password"
                            style={styles.input}
                            size="sm"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button size="sm" type="submit" style={styles.button}>
                        Login
                    </Button>
                </Form>
                <div style={styles.linkContainer}>
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" style={styles.link}>
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
