import { callLLM } from "../llm/llmClient.js";

export async function runTests(prompt, testCases) {

  const systemPrompt = `
You are simulating a Voice AI agent.

Respond exactly as the agent would based on its prompt instructions.

Do not explain anything.
Just respond as the agent.
`;

  const results = await Promise.all(
    testCases.map(async (test) => {

      const userPrompt = `
Agent Prompt:
${prompt}

User says:
${test.userInput}

Respond as the agent.
`;

      const agentResponse = await callLLM(systemPrompt, userPrompt);

      return {
        id: test.id,
        scenario: test.scenario,
        userInput: test.userInput,
        agentResponse: agentResponse.trim()
      };
    })
  );

  return results;
}