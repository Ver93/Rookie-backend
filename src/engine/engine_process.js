const { spawn } = require("child_process");
const listeners = require("./listener_store");

spawn("/var/www/portfolio/rookie-app/engine/rookie-engine/rookie-engine", [], {
    stdio: ["pipe", "pipe", "pipe"]
});


engine.stdout.on("data", data => {
    const text = data.toString().trim();
    console.log(text);

    for (let i = listeners.length - 1; i >= 0; i--) {
        const listener = listeners[i];
        if (text.startsWith(listener.waitFor)) {
            listener.resolve(text);
            listeners.splice(i, 1);
        }
    }
});

function send(cmd) {
    console.log(">>", cmd);
    engine.stdin.write(cmd + "\n");
}

send("uci");
send("isready");

module.exports = engine;
