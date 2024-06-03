// src/components/ImportGames.js
import React, { useState } from 'react';
import { MovesSection } from '../Moves/MovesStyles';
import { ChessContainer } from  '../ChessGame/ChessGameStyles'
import FileInput from '../FileInput/FileInput';
import ErrorMessage from './ErrorMessage';
import MovesList from '../Moves/MovesList';
import parsePGN from './parsePGN';
import GameMetadata from "../GameMetadata/GameMetadata";
import styled from "styled-components";

export const MainSection = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px; /* Adds space between metadata and move list */
`;

function ImportGames() {
    const [importedGames, setImportedGames] = useState([]);
    const [error, setError] = useState('');

    const handleFileImport = (file) => {
        if (file && (file.type === 'application/vnd.chess-pgn' || file.name.endsWith('.pgn'))) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                try {
                    const { metadata, moves } = parsePGN(content);
                    setImportedGames(prevGames => [...prevGames, { metadata, moves }]);
                    setError('');
                } catch (err) {
                    setError('Failed to process the file. Please ensure it is a valid PGN file.');
                }
            };
            reader.onerror = () => {
                setError('Failed to read the file.');
            };
            reader.readAsText(file);
        } else {
            setError('Please upload a valid PGN file.');
        }
    };

    return (
        <ChessContainer>
            <div>
                <h1>Import Games</h1>
                <FileInput onFileImport={handleFileImport} />
                <ErrorMessage message={error} />
                <div>
                    <h2>Imported Games</h2>
                    {importedGames.map((game, index) => (
                        <MainSection key={index}>
                            <GameMetadata metadata={game.metadata} />
                            <MovesSection>
                                <MovesList moves={game.moves} />
                            </MovesSection>
                        </MainSection>
                    ))}
                </div>
            </div>
        </ChessContainer>
    );
}

export default ImportGames;