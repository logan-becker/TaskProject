import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'


const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    //functions for registering user account
    const registerAccount = async (e) => {
        e.preventDefault();

        const userData = {
            username: username,
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:8000/accounts/register/', userData);
            if (response.status === 201) {
                alert('User successfully registered');
            }
        } catch (error) {
            console.error('There was an error registering the user!', error);
            alert('Failed to register. Please check the details and try again.');
        }
    };


    //styles
    const styles = {

        formContainer: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            marginBottom: '15px',
            marginTop: '15px',
        },

        label: {
            fontWeight: 'bold',
            color: '#333',
        },

        input: {
            marginBottom: '15px',
            border: '2px solid #ced4da',
            borderRadius: '5px',
        },

        button: {
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
        },

    }


    return (
        <div className='formContainer' style={styles.formContainer}>
            <Form onSubmit={registerAccount}>
                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                    <Form.Label style={styles.label}>Username</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter username' 
                        size='sm' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    <Form.Text className='text-muted'>
                        We'll never share your email with anyone else!
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                    <Form.Label style={styles.label}>Email</Form.Label>
                    <Form.Control 
                        type='email'
                        placeholder='Enter email' 
                        size='sm' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <Form.Text className='text-muted'>
                        We'll never share your email with anyone else!
                    </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label style={styles.label}>Password</Form.Label>
                    <Form.Control 
                    type='password' 
                    placeholder='password' 
                    size='sm' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                    />
                </Form.Group>
                <Button size='sm' variant="primary" type="submit" style={styles.button}>Register</Button>
            </Form>
        </div>
    )


}

export default Register;