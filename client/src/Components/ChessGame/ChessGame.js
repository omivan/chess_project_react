import React from 'react';
import { Chess } from 'chess.js';
import ChessboardWrapper from '../ChessBoard/ChessboardWrapper';
import MovesList from '../Moves/MovesList';
import PlayerInfo from '../Player/PlayerInfo';
import {PlayerSection} from '../Player/PlayerStyles'
import {BoardWrapper} from '../ChessBoard/ChessBoardStyles'
import { ChessContainer, GameOverMessage, ResignButton, PlayAgainButton} from './ChessGameStyles';
import {MovesSection} from '../Moves/MovesStyles'
import {CustomFileLabel}  from "../FileInput/FileInputStyles"

class ChessGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chess: new Chess(),
            fen: 'start',
            gameOver: false,
            gameResult: '',
            squareStyles: {},
            selectedSquare: '',
            moves: [],
            initialMoves: [],
            colorSelected: null,
            orientation: 'white', // Default orientation
        };

        this.boardRef = React.createRef();
    }
    resetGame = () => {
        this.setState({
            chess: new Chess(),
            fen: 'start',
            gameOver: false,
            gameResult: '',
            squareStyles: {},
            selectedSquare: '',
            moves: [],
            colorSelected: null, // Ensure the color choice is reset
        });
    };

    componentDidUpdate(prevProps) {

        if (this.props.isLoggedIn !== prevProps.isLoggedIn && !this.props.isLoggedIn) {
            this.resetGame();
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.boardRef.current && !this.boardRef.current.contains(event.target)) {
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
                let gameResult = '';
                if (tempChess.isCheckmate()) {
                    gameResult = tempChess.turn() === 'w' ? 'Black wins by checkmate' : 'White wins by checkmate';
                } else if (tempChess.isDraw()) {
                    gameResult = 'Draw';
                } else if (tempChess.isStalemate()) {
                    gameResult = 'Draw by stalemate';
                } else if (tempChess.isThreefoldRepetition()) {
                    gameResult = 'Draw by threefold repetition';
                } else if (tempChess.isInsufficientMaterial()) {
                    gameResult = 'Draw by insufficient material';
                } else {
                    gameResult = 'Player over';
                }
                this.setState({ gameResult }, this.handleGameOver);
            } else {
                this.makeRandomMove();
            }
        });
    };

    makeRandomMove = () => {
        let tempChess = new Chess(this.state.chess.fen());
        let possibleMoves = tempChess.moves();

        if (possibleMoves.length === 0) {
            // Game is over due to no legal moves left
            this.setState({
                gameOver: true,
                gameResult: 'Draw by stalemate'
            });
            return;
        }

        let randomIdx = Math.floor(Math.random() * possibleMoves.length);
        let move = tempChess.move(possibleMoves[randomIdx]);

        if (move === null) {
            return;  // If no move was possible for some reason
        }

        this.setState(prevState => ({
            chess: tempChess,
            fen: tempChess.fen(),
            squareStyles: {},
            selectedSquare: '',
            moves: [...prevState.moves, move.san]
        }), () => {
            this.checkGameOver();  // Check if the game is over after the random move
        });
    };

    checkGameOver = () => {
        const tempChess = new Chess(this.state.chess.fen());
        if (tempChess.isGameOver()) {  // Using game_over method to check any endgame condition
            let gameResult = '';
            if (tempChess.isCheckmate()) {
                gameResult = tempChess.turn() === 'w' ? 'Black wins by checkmate' : 'White wins by checkmate';
            } else if (tempChess.isDraw()) {
                gameResult = 'Draw';
            } else if (tempChess.isStalemate()) {
                gameResult = 'Draw by stalemate';
            } else if (tempChess.isThreefoldRepetition()) {
                gameResult = 'Draw by threefold repetition';
            } else if (tempChess.isInsufficientMaterial()) {
                gameResult = 'Draw by insufficient material';
            } else {
                gameResult = 'Game over';
            }
            this.setState({ gameResult }, this.handleGameOver);
        }
    };

    handleGameOver = () => {

        let numericalResult;
        if (this.state.gameResult.includes("White wins")) {
            numericalResult = 1;
        } else if (this.state.gameResult.includes("Black wins")) {
            numericalResult = 0;
        } else if (this.state.gameResult.includes("You resigned")) {
            numericalResult = this.state.orientation === "white" ? 0 : 1;
        } else {
            numericalResult = 0.5;
        }

        const gameData = {
            details: "Regular game",
            result: numericalResult,  // Updated to use the numerical result
            moves: this.state.moves,
            color: this.state.orientation
        };

        this.submitGame(gameData);
        this.setState({ gameOver: true });
    };

    submitGame = async (gameData) => {

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, not submitting game.');
            return;  // Exit the function if no token is found
        }
        try {
            const response = await fetch('http://localhost:5000/api/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify(gameData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit game');
            }

        } catch (error) {
            console.error('Error saving game:', error);
        }
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

    handleResign = () => {
        this.setState({
            gameOver: true,
            gameResult: 'You resigned. Player over.',
            initialMoves: this.state.moves
        }, this.handleGameOver);
    };
    handlePlayAgain = () => {
        this.setState({
            chess: new Chess(),
            fen: 'start',
            gameOver: false,
            gameResult: '',
            squareStyles: {},
            selectedSquare: '',
            moves: [],
            colorSelected: null, // Reset the color selection
        });
    };


    handleColorSelection = (color) => {
        this.setState({
            colorSelected: color,
            chess: new Chess(),
            orientation: color === 'black' ? 'black' : 'white'
        }, () => {
            if (color === 'black') {
                setTimeout(() => {
                    this.makeRandomMove();
                }, 500);
            }
        });
    };

    renderColorChoice() {
        if (this.state.colorSelected === null) {
            return (
                <>
                    <CustomFileLabel onClick={() => this.handleColorSelection('white')}>Play as White</CustomFileLabel>
                    <CustomFileLabel onClick={() => this.handleColorSelection('black')}>Play as Black</CustomFileLabel>
                </>

            );
        }
        return null;
    }

    render() {
        const username = this.props.username;
        return (
            <ChessContainer>
                {this.renderColorChoice()}
                {this.state.colorSelected && (
                    <>
                        <PlayerSection>
                            <PlayerInfo name="Bot" logo="Images/terminator.jpg" />
                            <PlayerInfo name={username} logo="Images/sigmoindus.ico" />
                        </PlayerSection>

                        <BoardWrapper>
                            <ChessboardWrapper
                                ref={this.boardRef}
                                position={this.state.fen}
                                onDrop={this.onDrop}
                                squareStyles={this.state.squareStyles}
                                orientation={this.state.orientation}
                                onSquareClick={this.handleSquareClick}
                            />
                        </BoardWrapper>
                        <MovesSection>
                            <MovesList moves={this.state.moves} />
                            <ResignButton onClick={this.handleResign}>Resign</ResignButton>
                        </MovesSection>
                        {this.state.gameOver && (
                            <GameOverMessage>
                                {this.state.gameResult}
                                <PlayAgainButton onClick={this.handlePlayAgain}>Play Again</PlayAgainButton>
                            </GameOverMessage>
                        )}
                    </>
                )}
            </ChessContainer>
        );
    }
}

export default ChessGame;
