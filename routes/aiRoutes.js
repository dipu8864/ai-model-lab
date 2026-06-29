const express = require("express");
const aiController = require("../controllers/aiController");
const asyncHandler = require("../middleware/asyncHandler");

const router = express.Router();

router.post("/ask", asyncHandler(aiController.ask));
router.post("/summarize", asyncHandler(aiController.summarize));
router.post("/search", asyncHandler(aiController.search));

module.exports = router;
