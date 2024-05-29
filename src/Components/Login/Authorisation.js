import React, { useState } from 'react';
import {ChessContainer} from "../styles";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <ChessContainer>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Username:
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </ChessContainer>
    );
}

export default Login;