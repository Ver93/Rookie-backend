const { spawn } = require("child_process");
const listeners = require("./listener_store");

const engine = spawn("/var/www/portfolio/rookie-app/engine/rookie-engine/build/rookie_engine", [], {
    stdio: ["pipe", "pipe", "pipe"]
});

// Samla ALLA rader, även om flera kommer i samma chunk
engine.stdout.on("data", data => {
    const text = data.toString();

    // Dela upp i rader
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);

    for (const line of lines) {
        console.log(line);

        // Matcha listeners
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

send("uci");
send("isready");

process.on("exit", () => engine.kill("SIGKILL"));
process.on("SIGINT", () => engine.kill("SIGKILL"));
process.on("SIGTERM", () => engine.kill("SIGKILL"));

module.exports = engine;
