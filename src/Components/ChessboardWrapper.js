import React from 'react';
import Chessboard from 'chessboardjsx';
import { BoardContainer } from './styles';

const ChessboardWrapper = React.forwardRef((props, ref) => (
    <BoardContainer ref={ref}>
        <Chessboard
            position={props.position}
            onDrop={props.onDrop}
            width={700}
            squareStyles={props.squareStyles}
            onSquareClick={props.onSquareClick}
        />
    </BoardContainer>
));

export default ChessboardWrapper;
