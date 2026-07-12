const uci = require("../engine/uci_adapters");

exports.go = async (fen, moves, depth) => {
    if (!fen || fen === "" || fen === "startpos") {
        uci.send(`position startpos moves ${moves.join(" ")}`);
    } else {
        uci.send(`position fen ${fen} moves ${moves.join(" ")}`);
    }

    uci.send(`go depth ${depth}`);

    const bestMoveLine = await uci.waitFor("bestmove");
    const move = bestMoveLine.split(" ")[1];

    return move;
};
