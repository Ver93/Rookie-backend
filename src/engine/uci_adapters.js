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

exports.collectFor = (ms) => {
    return new Promise(resolve => {
        let buffer = [];

        const handler = data => {
            buffer.push(data.toString().trim());
        };

        engine.stdout.on("data", handler);

        setTimeout(() => {
            engine.stdout.removeListener("data", handler);
            resolve(buffer.join("\n"));
        }, ms);
    });
};