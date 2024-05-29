// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChessGame from './Components/ChessGame';
import StatsPage from './Components/Stats/GameStats';
import { Helmet } from 'react-helmet';
import './App.css';
import Login from "./Components/Login/Authorisation";
import Weather from "./Components/Weather/Weather";
import ImportGames from "./Components/ImportGames/ImportGames";

function App() {
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
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<ChessGame />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/import" element={<ImportGames />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
