import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChessContainer } from "../ChessGame/ChessGameStyles";
import './GameStats.css';

const StatsPage = () => {
    const [chartType, setChartType] = useState('bar');
    const [gameData, setGameData] = useState({ wins: 0, losses: 0, draws: 0 });

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch('http://localhost:5000/api/games', {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const games = await response.json();
            analyzeGameData(games);
        };

        fetchGames().catch(error => console.error('Error:', error));
    }, []);

    const analyzeGameData = (games) => {
        let wins = 0;
        let losses = 0;
        let draws = 0;

        games.forEach(game => {
            if ((game.color === 'white' && game.result === 1) || (game.color === 'black' && game.result === 0)) {
                wins++;
            } else if ((game.color === 'white' && game.result === 0) || (game.color === 'black' && game.result === 1)) {
                losses++;
            } else {
                draws++;
            }
        });

        setGameData({ wins, losses, draws });
    };

    const data = {
        labels: ['Wins', 'Losses', 'Draws'],
        datasets: [
            {
                label: 'Game Outcomes',
                data: [gameData.wins, gameData.losses, gameData.draws],
                backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
                borderColor: ['#388e3c', '#d32f2f', '#fbc02d'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    };

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return <Bar data={data} options={options} height={400} />;
            case 'line':
                return <Line data={data} options={options} height={400} />;
            case 'pie':
                return <Pie data={data} options={options} height={400} />;
            default:
                return <Bar data={data} options={options} height={400} />;
        }
    };

    return (
        <ChessContainer>
            <div className="container">
                <h2>Game Statistics</h2>
                <div className="card">
                    <p><strong>Number of Wins:</strong> {gameData.wins}</p>
                    <p><strong>Number of Losses:</strong> {gameData.losses}</p>
                    <p><strong>Number of Draws:</strong> {gameData.draws}</p>
                </div>
                <div className="card">
                    <label htmlFor="chartType">Choose Chart Type:</label>
                    <select id="chartType" value={chartType} onChange={handleChartTypeChange}>
                        <option value="bar">Bar</option>
                        <option value="line">Line</option>
                        <option value="pie">Pie</option>
                    </select>
                </div>
                <div className="chartContainer">
                    <div className="chart">
                        {renderChart()}
                    </div>
                </div>
            </div>
        </ChessContainer>
    );
};

export default StatsPage;
