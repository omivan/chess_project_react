// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChessGame from './Components/ChessGame';
import StatsPage from './Components/GameStats';
import { Helmet } from 'react-helmet';
import './App.css';

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
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<ChessGame />} />
                    <Route path="/stats" element={<StatsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
