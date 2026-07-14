const express = require("express");
const router = express.Router();
const engineController = require("../controllers/engine_controller");

router.post("/uci", engineController.uci);
router.post("/isready", engineController.isready);
router.post("/setoption", engineController.setoption);
router.post("/ucinewgame", engineController.ucinewgame);
router.post("/position", engineController.position);
router.post("/go", engineController.go);
router.post("/stop", engineController.stop);
router.post("/quit", engineController.quit);

module.exports = router; 