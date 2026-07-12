const engineService = require("../../services/engine_services");
const uci = require("../../engine/uci_adapters");

exports.go = async (req, res) => {
    const { fen, moves, depth } = req.body;

    const bestMove = await engineService.go(fen, moves, depth);
    
    res.json({ bestMove });
};

exports.terminal = async (req, res) => {
    const cmd = req.body.command;

    console.log("Terminal command:", cmd);

    // Skicka kommandot till motorn
    uci.send(cmd);

    // Vänta 50ms och samla ALLT
    const output = await uci.collectFor(100);

    res.json({ output });
};