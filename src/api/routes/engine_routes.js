const express = require("express");
const router = express.Router();
const engineController = require("../controllers/engine_controller");

router.post("/go", engineController.go);
router.post("/terminal", engineController.terminal);


module.exports = router; 