import { callLLM, safeJSONParse } from "../llm/llmClient.js";

export async function evaluateResults(results, successCriteria) {

  const systemPrompt = `
You are an AI evaluator that judges Voice AI agent responses.

Evaluate whether the response satisfies the success criteria.

Return ONLY valid JSON.
Do not include markdown or explanations.
`;

  const evaluations = await Promise.all(
    results.map(async (test) => {

      const userPrompt = `
Success Criteria:
${successCriteria.join(", ")}

User Input:
${test.userInput}

Agent Response:
${test.agentResponse}

Return JSON:

{
  "status": "PASS or FAIL",
  "reason": ""
}
`;

      const response = await callLLM(systemPrompt, userPrompt);
      const evaluation = safeJSONParse(response);

      return {
        scenario: test.scenario,
        agent_response: test.agentResponse,
        status: evaluation.status,
        evaluation_reason: evaluation.reason
      };

    })
  );

  const passed = evaluations.filter(e => e.status === "PASS").length;
  const failed = evaluations.length - passed;

  return {
    success_rate: Math.round((passed / evaluations.length) * 100),
    total_tests: evaluations.length,
    passed,
    failed,
    summary: `Completed ${evaluations.length} test scenarios with ${passed} passing and ${failed} failing.`,
    key_findings: evaluations.filter(e => e.status === "FAIL").map(e => e.evaluation_reason).slice(0, 3),
    evaluations
  };
}