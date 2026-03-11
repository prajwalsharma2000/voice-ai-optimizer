import { analyzePrompt as analyzePromptService } from "../services/promptAnalyzer.js";
import { generateTests as generateTestsService } from "../services/testGenerator.js";
import { runTests as runTestsService } from "../services/testRunner.js";
import { evaluateResults as evaluateResultsService } from "../services/evaluator.js";
import { optimizePrompt as optimizePromptService } from "../services/optimizer.js";

export const analyzePrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    const analysis = await analyzePromptService(prompt);

    res.json({ analysis });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to analyze prompt" });
  }
};

export const generateTests = async (req, res) => {
  try {
    const { prompt, analysis } = req.body;

    const testCases = await generateTestsService(prompt, analysis);

    res.json(testCases);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate test cases" });
  }
};

export const runTests = async (req, res) => {
  try {

    const { prompt, testCases, successCriteria } = req.body;

    const results = await runTestsService(prompt, testCases);

    const evaluation = await evaluateResultsService(results, successCriteria);

    res.json(evaluation);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to run tests" });
  }
};

export const optimizePrompt = async (req, res) => {

  try {

    const { originalPrompt, evaluations } = req.body;

    const optimized = await optimizePromptService(
      originalPrompt,
      evaluations
    );

    res.json(optimized);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to optimize prompt"
    });

  }

};

export const runCopilot = async (req, res) => {
  try {

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = (step, status, data = null, error = null) => {
      const event = { step, status, data, error };
      console.log('Sending SSE:', event);
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    };

    try {
      // 1️⃣ Analyze Prompt
      sendEvent('analyze', 'running');
      const analysis = await analyzePromptService(prompt);
      console.log('Analysis result:', analysis);
      sendEvent('analyze', 'completed', analysis);

      // 2️⃣ Generate Tests
      sendEvent('generate', 'running');
      const testCaseResponse = await generateTestsService(prompt, analysis);
      const testCases = testCaseResponse.testCases;
      console.log('Test cases generated:', testCases?.length);
      sendEvent('generate', 'completed', testCases);

      // 3️⃣ Run Tests
      sendEvent('simulate', 'running');
      const results = await runTestsService(prompt, testCases);
      console.log('Test results:', results?.length);
      sendEvent('simulate', 'completed', results);

      // 4️⃣ Evaluate
      sendEvent('evaluate', 'running');
      const evaluation = await evaluateResultsService(
        results,
        analysis.successCriteria || []
      );
      console.log('Evaluation:', evaluation);
      sendEvent('evaluate', 'completed', evaluation);

      // 5️⃣ Optimize
      sendEvent('optimize', 'running');
      const optimization = await optimizePromptService(
        prompt,
        evaluation.evaluations
      );
      console.log('Optimization:', optimization);
      sendEvent('optimize', 'completed', optimization);

      sendEvent('complete', 'completed');
      res.end();
    } catch (stepError) {
      console.error('Pipeline step error:', stepError);
      
      // Determine which step failed based on current state
      let failedStep = 'unknown';
      if (!analysis) failedStep = 'analyze';
      else if (!testCases) failedStep = 'generate';
      else if (!results) failedStep = 'simulate';
      else if (!evaluation) failedStep = 'evaluate';
      else failedStep = 'optimize';
      
      sendEvent(failedStep, 'failed', null, stepError.message || 'Pipeline execution failed');
      res.end();
    }

  } catch (error) {

    console.error('Copilot error:', error);

    res.write(`data: ${JSON.stringify({ step: 'error', status: 'failed', error: error.message })}\n\n`);
    res.end();

  }
};