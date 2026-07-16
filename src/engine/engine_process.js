const { spawn } = require("child_process");
const listeners = require("./listener_store");

const engine = spawn("/var/www/portfolio/rookie-app/engine/rookie-engine/build/rookie_engine", [], {
    stdio: ["pipe", "pipe", "pipe"]
});

engine.stdout.on("data", data => {
    const text = data.toString();

    const lines = text
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(Boolean);

    for (const line of lines) {
        console.log(line);

        for (let i = listeners.length - 1; i >= 0; i--) {
            const listener = listeners[i];

            if (line.startsWith(listener.waitFor)) {
                listener.resolve(line);
                listeners.splice(i, 1);
            }
        }
    }
});

function send(cmd) {
    console.log(">>", cmd);
    engine.stdin.write(cmd + "\n");
}

process.on("exit", () => engine.kill("SIGKILL"));
process.on("SIGINT", () => engine.kill("SIGKILL"));
process.on("SIGTERM", () => engine.kill("SIGKILL"));

module.exports = engine;
