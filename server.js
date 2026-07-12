/* Startar Servern */

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const engineRoutes = require("./src/api/routes/engine_routes");
app.use("/api/engine", engineRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
