import React from 'react';
import { MovesContainer, MovesTable, MovesRow, MoveNumber, MoveCell } from './MovesStyles';

const MovesList = ({ moves }) => {
    const movePairs = [];
    for (let i = 0; i < moves.length; i += 2) {
        movePairs.push([moves[i], moves[i + 1]]);
    }

    return (
        <MovesContainer>
            <h3>Moves</h3>
            <MovesTable>
                <tbody>
                {movePairs.map((pair, index) => (
                    <MovesRow key={index}>
                        <MoveNumber>{index + 1}.</MoveNumber>
                        <MoveCell>{pair[0]}</MoveCell>
                        <MoveCell>{pair[1]}</MoveCell>
                    </MovesRow>
                ))}
                </tbody>
            </MovesTable>
        </MovesContainer>
    );
};

export default MovesList;
