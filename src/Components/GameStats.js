import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const StatsPage = () => {
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

    return (
        <div>
            <h2>Game Statistics</h2>
            <div>
                <p>Number of Wins: 10</p>
                <p>Number of Losses: 5</p>
                <p>Number of Draws: 3</p>
            </div>
            <div>
                <Bar data={data} />
            </div>
        </div>
    );
};

export default StatsPage;