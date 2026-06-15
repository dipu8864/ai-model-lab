const express = require("express");
const aiController = require("../controllers/aiController");

const router = express.Router();

router.post("/ask", (req, res) => aiController.ask(req, res));
router.post("/summarize", (req, res) => aiController.summarize(req, res));
router.post("/search", (req, res) => aiController.search(req, res));

module.exports = router;
