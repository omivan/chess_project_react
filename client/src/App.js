import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChessGame from './Components/ChessGame/ChessGame';
import StatsPage from './Components/Stats/GameStats';
import { Helmet } from 'react-helmet';
import './App.css';
import Login from "./Components/Login/Login";
import ImportGames from "./Components/ImportGames/ImportGames";
import Register from "./Components/Register /Registr";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('GuestUser');
    console.warn = () => {};
    console.error = () => {};
    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        setUsername('GuestUser');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };
    return (
        <Router>
            <div className="App">
                <Helmet>
                    <title>Chess Game</title>
                    <link rel="icon" href="Images/logo.ico" />
                </Helmet>

                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {isLoggedIn && (
                            <li>
                                <Link to="/stats">Statistics</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/import">Import Games</Link>
                        </li>
                        <li>
                            {isLoggedIn ? (
                                <>
                                    <span className="welcome-message">Welcome, {username}</span>
                                    <button onClick={handleLogout} className="nav-button">Logout</button>
                                </>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<ChessGame isLoggedIn={isLoggedIn} username={username} />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/import" element={<ImportGames />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>

            </div>
        </Router>
    );
}

export default App;