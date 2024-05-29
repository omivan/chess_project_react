// src/App.js
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChessGame from './Components/ChessGame';
import StatsPage from './Components/Stats/GameStats';
import { Helmet } from 'react-helmet';
import './App.css';
import Login from "./Components/Login/Authorisation";
import Weather from "./Components/Weather/Weather";
import ImportGames from "./Components/ImportGames/ImportGames";
import WeatherWidget from "./Components/Weather/WeatherWidget";
import Register from "./Components/Login/Registr";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <Router>
            <div className="App">
                <Helmet>
                    <title>My Custom Chess Game</title>
                    <link rel="icon" href="Images/logo.ico" />
                </Helmet>

                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/stats">Statistics</Link>
                        </li>
                        <li>
                            <Link to="/import">Import Games</Link>
                        </li>
                        <li>
                            <Link to="/weather">Weather</Link>
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
                    <Route path="/" element={<ChessGame />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/import" element={<ImportGames />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>

                {/* Add WeatherWidget to the main App layout if needed */}
                <div className="widget-container">
                    <WeatherWidget />
                </div>
            </div>
        </Router>
    );
}

export default App;