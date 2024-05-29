// src/Components/Register/Register.js
import React, { useState } from 'react';
import styled from 'styled-components';
import {ChessContainer} from "../styles";

// Styled components
const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    //background-color: #f0f2f5;
`;

const RegisterForm = styled.form`
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
    text-align: left;

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const RegisterTitle = styled.h1`
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
`;

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate passwords
        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }
        // Handle registration logic
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
