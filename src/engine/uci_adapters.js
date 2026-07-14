const engine = require("../engine/engine_process");
const listeners = require("./listener_store");

exports.send = (cmd) => {
    engine.stdin.write(cmd + "\n");
};

// Vänta på en specifik rad, t.ex. "bestmove"
exports.waitFor = (keyword) => {
    return new Promise(resolve => {
        listeners.push({ waitFor: keyword, resolve });
    });
};

// Samla ALL output under X ms
exports.collectFor = (ms) => {
    return new Promise(resolve => {
        let buffer = [];

        const handler = data => {
            const text = data.toString();
            const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
            buffer.push(...lines);
        };

        engine.stdout.on("data", handler);

        setTimeout(() => {
            engine.stdout.removeListener("data", handler);
            resolve(buffer.join("\n"));
        }, ms);
    });
};
