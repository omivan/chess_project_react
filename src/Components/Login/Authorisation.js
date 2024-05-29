import React, { useState } from 'react';
import styled from 'styled-components';
import {ChessContainer} from "../styles";
import {Link, useNavigate} from "react-router-dom";

// Styled components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  //background-color: #f0f2f5;
`;

const LoginForm = styled.form`
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

const RegisterLink = styled.div`
  margin-top: 20px;
  font-size: 14px;

  a {
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const LoginTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setError('Username and password cannot be empty');
            return;
        }
        // Handle login logic
        console.log('Username:', username);
        console.log('Password:', password);
        onLogin(username); // Notify parent component about login
        navigate('/'); // Redirect to home page
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