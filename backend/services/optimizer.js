import { callLLM, safeJSONParse } from "../llm/llmClient.js";

export async function optimizePrompt(originalPrompt, evaluations) {

  const failedTests = evaluations.filter(e => e.status === "FAIL");

  if (failedTests.length === 0) {
    return {
      optimized_prompt: originalPrompt,
      changes: [],
      expected_improvement: "No failures detected"
    };
  }

  const systemPrompt = `
You are an AI system that improves Voice AI agent prompts.

Refine the prompt so the agent handles failure cases better.

Return ONLY valid JSON.
Do not include markdown.
`;

  const failureDescriptions = failedTests.map(f =>
    `Scenario: ${f.scenario}
Reason: ${f.evaluation_reason}`
  ).join("\n");

  const userPrompt = `
Original Prompt:
${originalPrompt}

Failures Observed:
${failureDescriptions}

Improve the prompt so the agent can handle these situations correctly.

Return JSON:

{
  "optimized_prompt": "",
  "changes": [{"description": ""}],
  "expected_improvement": ""
}
`;

  const response = await callLLM(systemPrompt, userPrompt);

  return safeJSONParse(response);
}