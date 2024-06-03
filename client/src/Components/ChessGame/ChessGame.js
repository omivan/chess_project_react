import React from 'react';
import { Chess } from 'chess.js';
import ChessboardWrapper from '../ChessBoard/ChessboardWrapper';
import MovesList from '../Moves/MovesList';
import PlayerInfo from '../Player/PlayerInfo';
import {PlayerSection} from '../Player/PlayerStyles'
import {BoardWrapper} from '../ChessBoard/ChessBoardStyles'
import { ChessContainer, GameOverMessage, ResignButton, PlayAgainButton, ReplayButton } from '../ChessGame/ChessGameStyles';
import {MovesSection} from '../Moves/MovesStyles'

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
            initialMoves: []  // Store initial moves
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
                this.setState({ gameOver: true, gameResult });
            } else {
                this.makeRandomMove();
            }
        });
    };

    makeRandomMove = () => {
        let possibleMoves = this.state.chess.moves();
        if (possibleMoves.length === 0) {
            this.setState({ gameOver: true, gameResult: 'Draw by stalemate' });
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

    handleResign = () => {
        this.setState({ gameOver: true, gameResult: 'You resigned. Player over.', initialMoves: this.state.moves });
    };

    handlePlayAgain = () => {
        this.setState({
            chess: new Chess(),
            fen: 'start',
            gameOver: false,
            gameResult: '',
            squareStyles: {},
            selectedSquare: '',
            moves: []
        });
    };

    handleReplay = () => {
        this.setState({
            chess: new Chess(),
            fen: 'start',
            gameOver: false,
            gameResult: '',
            squareStyles: {},
            selectedSquare: '',
            moves: this.state.initialMoves
        }, () => {
            this.replayMoves(this.state.initialMoves);
        });
    };

    replayMoves = (moves) => {
        let tempChess = new Chess();
        moves.forEach((move, index) => {
            setTimeout(() => {
                tempChess.move(move);
                this.setState({
                    chess: tempChess,
                    fen: tempChess.fen(),
                    moves: moves.slice(0, index + 1)
                });
            }, index * 500);
        });
    };

    render() {
        return (
            <ChessContainer>
                <PlayerSection>
                    <PlayerInfo name="Bot" logo="Images/terminator.jpg" />
                    <PlayerInfo name="Sigmoindusenko" logo="Images/sigmoindus.ico" />
                </PlayerSection>
                <BoardWrapper>
                    <ChessboardWrapper
                        ref={this.boardRef}
                        position={this.state.fen}
                        onDrop={this.onDrop}
                        squareStyles={this.state.squareStyles}
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
                        <ReplayButton onClick={this.handleReplay}>Replay</ReplayButton>
                    </GameOverMessage>
                )}
            </ChessContainer>
        );
    }
}

export default ChessGame;
