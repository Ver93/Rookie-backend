const uci = require("../engine/uci_adapters");

exports.uci = async () => {
    console.log("command: uci");
    const responsePromise = uci.waitFor("uciok");
    uci.send("uci");
    const response = await responsePromise;
    return response;
};

exports.isready = async () => {
    console.log("command: isready");
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
    console.log("command: position");
    if (!fen || fen === "" || fen === "startpos") {
        uci.send(`position startpos moves ${moves.join(" ")}`);
    } else {
        uci.send(`position fen ${fen} moves ${moves.join(" ")}`);
    }
};

exports.go = async (depth) => {
    console.log("command: go");
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
