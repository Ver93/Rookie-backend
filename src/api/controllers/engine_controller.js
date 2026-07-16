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
    res.status(200).json({ ans: "OK" });
}
exports.ucinewgame = async (req, res) => {
    await engineService.ucinewgame();
    res.status(200).json({ ans: "OK" });
}

exports.position = async (req, res) => {
    const { fen, moves } = req.body;
    await engineService.position(fen, moves);
    res.status(200).json({ ans: "OK" });
};


exports.go = async (req, res) => {
    const { depth } = req.body;
    const bestMove = await engineService.go(depth);
    res.json({ bestMove });
};


exports.stop = async (req, res) => {
    await engineService.stop();
    res.status(200).json({ ans: "OK" });
}
exports.quit = async (req, res) => {
    await engineService.quit();
    res.status(200).json({ ans: "OK" });
}  