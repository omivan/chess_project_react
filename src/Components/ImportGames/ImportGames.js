import React, { useState } from 'react';
import {ChessContainer} from "../styles";

function ImportGames() {
    const [importedGames, setImportedGames] = useState([]);

    const handleImport = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            // Assuming the content is in a specific format (e.g., PGN)
            // Process the content and update the state
            setImportedGames(prevGames => [...prevGames, content]);
        };
        reader.readAsText(file);
    };

    return (
        <ChessContainer>
            <div>
                <h1>Import Games</h1>
                <input type="file" onChange={handleImport} />
                <div>
                    <h2>Imported Games</h2>
                    <ul>
                        {importedGames.map((game, index) => (
                            <li key={index}>{game}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </ChessContainer>
    );
}

export default ImportGames;