import React from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

class ChessGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chess: new Chess(),
            fen: 'start',
            gameOver: false,
            squareStyles: {},
            selectedSquare: '',
            moves: []
        };

        this.boardRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.boardRef && !this.boardRef.current.contains(event.target)) {
            this.clearHighlights();
        }
    };

    clearHighlights = () => {
        if (Object.keys(this.state.squareStyles).length > 0) {
            this.setState({ squareStyles: {}, selectedSquare: '' });
        }
    };

    onDrop = ({ sourceSquare, targetSquare }) => {
        this.makeMove(sourceSquare, targetSquare);
    };

    makeMove = (sourceSquare, targetSquare) => {
        let tempChess = new Chess(this.state.chess.fen());
        const legalMoves = tempChess.moves({ square: sourceSquare, verbose: true });
        const isMoveLegal = legalMoves.some(move => move.to === targetSquare);

        if (!isMoveLegal) {
            return;
        }

        let move = tempChess.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q'
        });

        if (move === null) return;

        this.setState(prevState => ({
            chess: tempChess,
            fen: tempChess.fen(),
            squareStyles: {},
            selectedSquare: '',
            moves: [...prevState.moves, move.san]
        }), () => {
            if (tempChess.isGameOver()) {
                this.setState({ gameOver: true });
                alert('Game over');
            } else {
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
        let move = this.state.chess.move(possibleMoves[randomIdx]);
        this.setState(prevState => ({
            chess: this.state.chess,
            fen: this.state.chess.fen(),
            squareStyles: {},
            moves: [...prevState.moves, move.san]
        }));
    };

    handleSquareClick = (square) => {
        const { chess, selectedSquare } = this.state;

        if (selectedSquare && selectedSquare !== square) {
            this.makeMove(selectedSquare, square);
        } else {
            const moves = chess.moves({ square, verbose: true });

            if (moves.length === 0 || selectedSquare === square) {
                this.clearHighlights();
            } else {
                const newSquareStyles = moves.reduce((styles, move) => ({
                    ...styles,
                    [move.to]: {
                        background: "rgba(255, 255, 100, 0.5)"
                    }
                }), {});

                this.setState({ squareStyles: newSquareStyles, selectedSquare: square });
            }
        }
    };

    render() {
        const movePairs = [];
        for (let i = 0; i < this.state.moves.length; i += 2) {
            movePairs.push([this.state.moves[i], this.state.moves[i + 1]]);
        }

        return (
            <div style={{ display: 'flex' }}>
                <div ref={this.boardRef} style={{ position: "relative" }}>
                    <Chessboard
                        position={this.state.fen}
                        onDrop={this.onDrop}
                        width={800}
                        squareStyles={this.state.squareStyles}
                        onSquareClick={this.handleSquareClick}
                    />
                    {this.state.gameOver && <p className="game-over">Game Over. Refresh to play again!</p>}
                </div>
                <div style={{ marginLeft: '20px', width: '200px', overflowY: 'auto', maxHeight: '800px' }}>
                    <h3>Moves</h3>
                    <table>
                        <tbody>
                        {movePairs.map((pair, index) => (
                            <tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{pair[0]}</td>
                                <td>{pair[1]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ChessGame;
