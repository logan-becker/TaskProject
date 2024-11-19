import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginSuccess, logout } from '../../slices/authSlice';



const Login = () => {

    // use state
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    //add error ?

    //functions for auth
    const loginAccount = async (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:8000/accounts/login/', loginData);

            if (response.status === 200) {
                const {access: token, email } = (response).data;

                //dispatch login success to update state 
                dispatch(loginSuccess({ user: {email}, token}));
                setEmail('');
                setPassword('');
                console.log('Dispatching loginSuccess:', { user: { email }, token });


                //store tokens locally for persistence
                localStorage.setItem('accessToken', token);
                localStorage.setItem('email', email)

            }
            
        } catch (error) {
            //dispatch login failure action with error message to update redux state
            dispatch(loginFailure({error: error.message}));
            console.log("dispatching login failure")
            //set error here
        }

        setEmail('');
        setPassword('');
    }

    // logout
    const logout = () => {
        dispatch(logout());

        localStorage.removeItem('accessToken');
        localStorage.removeItem('email');

        setEmail('');
        setPassword('');

        console.log('User Logged Out')
    }

    console.log('Is Authenticated:', isAuthenticated); // Should be true if login succeeded

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
                    <Form.Control type='email' placeholder='Enter email' size='sm' onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <Form.Text className='text-muted'>
                        We'll never share your email with anyone else!
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label style={styles.label}>Password</Form.Label>
                    <Form.Control type='password' value={password} placeholder='password' size='sm' onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button size='sm' variant="primary" type="submit" style={styles.button}>Login</Button>
            </Form>
            {/* <Button onClick={logout}> LOGOUT</Button> */}
        </div>
    )


}

export default Login;