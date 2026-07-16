const engineService = require("../../services/engine_services");
const uci = require("../../engine/uci_adapters");
const engine = require("../../engine/engine_process");

exports.uci = async (req, res) => {
    const ans = await engineService.uci();
    res.json({ ans });
}

exports.isready = async (req, res) => {
    const ans = await engineService.isready();
    res.json({ ans });
}
exports.setoption = async (req, res) => {
    await engineService.setoption();
    res.sendStatus(200);
}
exports.ucinewgame = async (req, res) => {
    await engineService.ucinewgame();
    res.sendStatus(200);
}

exports.position = async (req, res) => {
    const { fen, moves } = req.body;
    await engineService.position(fen, moves);
    res.sendStatus(200);
};


exports.go = async (req, res) => {
    const { depth } = req.body;
    const bestMove = await engineService.go(depth);
    res.json({ bestMove });
};


exports.stop = async (req, res) => {
    await engineService.stop();
    res.sendStatus(200);
}
exports.quit = async (req, res) => {
    await engineService.quit();
    res.sendStatus(200);
}  