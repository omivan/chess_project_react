import React from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

class ChessGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chess: new Chess(),
            fen: 'start', // Starting FEN notation of the board
            gameOver: false // State to track if the game is over
        };
    }

    onDrop = ({ sourceSquare, targetSquare }) => {
        // Create a temporary instance to move without changing state
        let tempChess = new Chess(this.state.chess.fen());


        console.log(tempChess.moves())

        // Attempt to make a move
        let move = tempChess.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q' // Promote to a queen if applicable
        });
        console.log(move)

        if (move === null) return; // Ignore if move is illegal

        // Update the state with the new valid move
        this.setState({ chess: tempChess, fen: tempChess.fen() }, () => {
            // Check for end of game
            if (tempChess.isGameOver()) {
                this.setState({ gameOver: true });
                alert('Game over');
            } else {
                // Make a move for the bot
                this.makeRandomMove();
            }
        });
    };

    makeRandomMove = () => {
        let possibleMoves = this.state.chess.moves();

        if (possibleMoves.length === 0) {
            this.setState({ gameOver: true });
            alert('Game over');
            return;
        }

        let randomIdx = Math.floor(Math.random() * possibleMoves.length);
        this.state.chess.move(possibleMoves[randomIdx]);
        this.setState({ chess: this.state.chess, fen: this.state.chess.fen() });
    };

    render() {
        return (
            <div>
                <Chessboard
                    position={this.state.fen}
                    onDrop={this.onDrop}
                    width={320}
                />
                {this.state.gameOver && <p>Game Over. Refresh to play again!</p>}
            </div>
        );
    }
}

export default ChessGame;
