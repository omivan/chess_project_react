import React, { useState } from 'react';
import { RegisterContainer, RegisterForm, FormGroup, SubmitButton, RegisterTitle } from './RegisterStyle';
import { ChessContainer } from "../ChessGame/ChessGameStyles";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); // New state for success message

    const registerUser = async (username, email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            setMessage('User registered successfully'); // Set success message
            setError(''); // Clear any previous errors
        } catch (error) {
            setError(error.message);
            setMessage(''); // Clear any previous success messages
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }

        registerUser(username, email, password);
    };

    return (
        <ChessContainer>
            <RegisterContainer>
                <RegisterForm onSubmit={handleSubmit}>
                    <RegisterTitle>Register</RegisterTitle>
                    {message && <p style={{ color: 'green' }}>{message}</p>} {"Registered successfully"}
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
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <FormGroup>
                        <label>Repeat Password:</label>
                        <input
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    </FormGroup>
                    <SubmitButton type="submit">Register</SubmitButton>
                </RegisterForm>
            </RegisterContainer>
        </ChessContainer>
    );
}

export default Register;
