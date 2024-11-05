import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'


const Login = () => {

    // use state
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    //functions for auth
    const loginAccount = async (e) => {
        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = axios.post('http://localhost:8000/accounts/login/', loginData);
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', (await response).data.refresh);
                localStorage.setItem('email', (await response).data.email);
            }
            alert('Login successful!')
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert('Invalid credentials. Please try again.');
        }
    }
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
            <Form onSubmit={loginAccount}>
                <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                    <Form.Label style={styles.label}>Email</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' size='sm' onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className='text-muted'>
                        We'll never share your email with anyone else!
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label style={styles.label}>Password</Form.Label>
                    <Form.Control type='password' placeholder='password' size='sm' onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button size='sm' variant="primary" type="submit" style={styles.button}>Submit</Button>
            </Form>
        </div>
    )


}

export default Login;