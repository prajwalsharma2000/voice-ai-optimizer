import express from "express";
import {
  analyzePrompt,
  generateTests,
  runTests,
  optimizePrompt,
  runCopilot
} from "../controllers/optimizerController.js";

const router = express.Router();

router.post("/analyze-prompt", analyzePrompt);
router.post("/generate-tests", generateTests);
router.post("/run-tests", runTests);
router.post("/optimize-prompt", optimizePrompt);
router.post("/run-copilot", runCopilot);

export default router;