import React, { useState } from 'react';
import { RegisterContainer, RegisterForm, FormGroup, SubmitButton, RegisterTitle } from './RegisterStyle';
import { ChessContainer } from "../ChessGame/ChessGameStyles";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        setError('');
    };

    return (
        <ChessContainer>
            <RegisterContainer>
                <RegisterForm onSubmit={handleSubmit}>
                    <RegisterTitle>Register</RegisterTitle>
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
