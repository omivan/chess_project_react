import React from 'react';

function GamesList({ games }) {
    return (
        <ul>
            {games.map((game, index) => (
                <li key={index}>
                    <pre>{game}</pre>
                </li>
            ))}
        </ul>
    );
}

export default GamesList;
