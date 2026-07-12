const engine = require("../engine/engine_process");
const listeners = require("./listener_store");

exports.send = (cmd) => {
    engine.stdin.write(cmd + "\n");
};

exports.waitFor = (keyword) => {
    return new Promise(resolve => {
        listeners.push({ waitFor: keyword, resolve });
    });
};

// Samla ALLT i 50ms och returnera i ett enda block
exports.collectFor = (ms) => {
    return new Promise(resolve => {
        let buffer = [];

        const handler = data => {
            buffer.push(data.toString().trim());
        };

        // Lyssna på ALLA rader
        engine.stdout.on("data", handler);

        // Vänta X ms och returnera allt
        setTimeout(() => {
            engine.stdout.removeListener("data", handler);
            resolve(buffer.join("\n"));
        }, ms);
    });
};