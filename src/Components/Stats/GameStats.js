import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChessContainer } from "../styles";

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

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f0f2f5',
    };

    const cardStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '20px',
        margin: '20px',
        textAlign: 'center',
        width: '300px',
    };

    const chartContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    };

    const chartStyle = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '20px',
        margin: '20px',
        width: '600px',
        height: '400px',
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
            <div style={containerStyle}>
                <h2>Game Statistics</h2>
                <div style={cardStyle}>
                    <p><strong>Number of Wins:</strong> {wins}</p>
                    <p><strong>Number of Losses:</strong> {losses}</p>
                    <p><strong>Number of Draws:</strong> {draws}</p>
                </div>
                <div style={cardStyle}>
                    <label htmlFor="chartType">Choose Chart Type:</label>
                    <select id="chartType" value={chartType} onChange={handleChartTypeChange}>
                        <option value="bar">Bar</option>
                        <option value="line">Line</option>
                        <option value="pie">Pie</option>
                    </select>
                </div>
                <div style={chartContainerStyle}>
                    <div style={chartStyle}>
                        {renderChart()}
                    </div>
                </div>
            </div>
        </ChessContainer>
    );
};

export default StatsPage;
