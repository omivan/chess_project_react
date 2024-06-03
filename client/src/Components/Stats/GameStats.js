import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChessContainer } from "../ChessGame/ChessGameStyles";
import './GameStats.css';  // Importing the CSS file for styles

const StatsPage = () => {
    const [chartType, setChartType] = useState('bar');

    const data = {
        labels: ['Wins', 'Losses', 'Draws'],
        datasets: [
            {
                label: 'Number of Games',
                data: [10, 5, 3], // Mock data
                backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
                borderColor: ['#388e3c', '#d32f2f', '#fbc02d'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
    };

    const [wins, losses, draws] = data.datasets[0].data;

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
                    <p><strong>Number of Wins:</strong> {wins}</p>
                    <p><strong>Number of Losses:</strong> {losses}</p>
                    <p><strong>Number of Draws:</strong> {draws}</p>
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