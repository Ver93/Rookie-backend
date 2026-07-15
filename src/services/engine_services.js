const uci = require("../engine/uci_adapters");

exports.uci = async () => {
    uci.send("uci");
    const response = await uci.waitFor("uciok");
    return response;
};

exports.isready = async () => {
    uci.send("isready");
    const response = await uci.waitFor("readyok");
    return response;
};

exports.setoption = async (options) => {
    uci.send(`setoption ${options.join(" ")}`);
};

exports.ucinewgame = async () => {
    uci.send("ucinewgame");
};
exports.position = async (fen, moves) => {
    if (!fen || fen === "" || fen === "startpos") {
        uci.send(`position startpos moves ${moves.join(" ")}`);
    } else {
        uci.send(`position fen ${fen} moves ${moves.join(" ")}`);
    }
};

exports.go = async (depth) => {
    uci.send(`go depth ${depth}`);

    const bestMoveLine = await uci.waitFor("bestmove");
    const move = bestMoveLine.split(" ")[1];

    return move;
};

exports.stop = async () => {
    uci.send("stop");
};
exports.quit = async () => {
    uci.send("quit");
};
