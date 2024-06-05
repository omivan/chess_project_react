import React, { useState } from 'react';
import {ChessContainer} from "../ChessGame/ChessGameStyles";
import {Link, useNavigate} from "react-router-dom";
import {LoginContainer, LoginForm, FormGroup, SubmitButton, RegisterLink, LoginTitle} from './LoginStyle'

// Styled components

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            console.log(response)

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log(data.token)
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            onLogin(username);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setError('Username and password cannot be empty');
            return;
        }

        loginUser(username, password);
    };

    return (
        <ChessContainer>
            <LoginContainer>
                <LoginForm onSubmit={handleSubmit}>
                    <LoginTitle>Login</LoginTitle>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <FormGroup>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <SubmitButton type="submit">Login</SubmitButton>
                    <RegisterLink>
                        <p>Don't have an account? <Link to="/register">Register here</Link></p>
                    </RegisterLink>
                </LoginForm>
            </LoginContainer>
        </ChessContainer>
    );
}

export default Login;