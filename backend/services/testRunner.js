import { callLLM } from "../llm/llmClient.js";

export async function runTests(prompt, testCases) {

  const systemPrompt = `
You are simulating a production Voice AI agent in a realistic conversation.

Critical Instructions:
1. Respond EXACTLY as the agent would based on its prompt instructions
2. Maintain character consistency throughout
3. Follow all behavioral rules and constraints
4. Handle edge cases as the agent would
5. Do NOT break character or explain your reasoning
6. Do NOT acknowledge you are an AI simulation
7. Respond naturally as if in a real customer interaction
8. Keep responses concise and conversational (2-4 sentences typical)

You are the agent. Respond authentically.
`;

  const results = await Promise.all(
    testCases.map(async (test) => {

      const userPrompt = `
Agent System Prompt:
${prompt}

---

User says: "${test.userInput}"

Respond as the agent would in this scenario: ${test.scenario}

Agent response:
`;

      const agentResponse = await callLLM(systemPrompt, userPrompt);

      return {
        id: test.id,
        category: test.category || "general",
        scenario: test.scenario,
        userInput: test.userInput,
        agentResponse: agentResponse.trim(),
        expectedBehavior: test.expectedBehavior || "",
        riskLevel: test.riskLevel || "low"
      };
    })
  );

  return results;
}