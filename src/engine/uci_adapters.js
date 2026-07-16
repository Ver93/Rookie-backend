const engine = require("../engine/engine_process");
const listeners = require("../engine/listener_store");

exports.send = (cmd) => {
    engine.stdin.write(cmd + "\n");
};

exports.waitFor = (keyword) => {
    console.log("Waiting for:", keyword);

    return new Promise(resolve => {
        listeners.push({
            waitFor: keyword,
            resolve: (data) => {
                console.log("Resolved:", data);
                resolve(data);
            }
        });
    });
};
