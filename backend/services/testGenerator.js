import { callLLM, safeJSONParse } from "../llm/llmClient.js";

export async function generateTests(prompt, analysis) {

  const systemPrompt = `
You are an AI system that generates test scenarios for Voice AI agents.

Return ONLY valid JSON.
Do not include markdown or explanations.
`;

  const userPrompt = `
Generate 8 realistic user test scenarios to evaluate this Voice AI agent.

Agent Prompt:
${prompt}

Agent Goal:
${analysis.goal}

Required Actions:
${analysis.requiredActions.join(", ")}

Behavior Rules:
${analysis.behaviorRules.join(", ")}

Include different types of users such as:
- normal request
- rude user
- confused user
- user interruption
- incomplete information
- refusal to provide email

Return JSON in this format:

{
  "testCases": [
    {
      "id": "test_1",
      "scenario": "",
      "userInput": ""
    }
  ]
}
`;

  const response = await callLLM(systemPrompt, userPrompt);

  return safeJSONParse(response);
}