const engine = require("../engine/engine_process");

let listeners = [];

exports.send = (cmd) => {
    engine.stdin.write(cmd + "\n");
};

exports.waitFor = (keyword) => {
    console.log("Waiting for:", keyword);

    return new Promise(resolve => {
        listeners.push({
            waitFor: keyword,
            resolve
        });
    });
};
