// src/utils/parsePGN.js
import { Chess } from 'chess.js';

const parsePGN = (pgn) => {
    const chess = new Chess();
    chess.loadPgn(pgn);

    const history = chess.history({ verbose: true });

    const metadata = {
        Event: chess.header().Event || 'Unknown',
        Site: chess.header().Site || 'Unknown',
        Date: chess.header().Date || 'Unknown',
        Round: chess.header().Round || 'Unknown',
        White: chess.header().White || 'Unknown',
        Black: chess.header().Black || 'Unknown',
        Result: chess.header().Result || 'Unknown'
    };

    const moves = history.map(move => move.san);

    return { metadata, moves };
};

export default parsePGN;
