import { callLLM, safeJSONParse } from "../llm/llmClient.js";

export async function optimizePrompt(originalPrompt, evaluations) {

  const failedTests = evaluations.filter(e => e.status === "FAIL");
  const criticalIssues = evaluations.filter(e => 
    e.security_issues?.length > 0 || 
    e.compliance_issues?.length > 0 || 
    e.risk_level === "critical"
  );

  if (failedTests.length === 0 && criticalIssues.length === 0) {
    return {
      optimized_prompt: originalPrompt,
      changes: [],
      expected_improvement: "No failures detected - prompt is production-ready",
      confidence_score: 10,
      production_ready: true
    };
  }

  const systemPrompt = `
You are an expert AI prompt engineer specializing in production Voice AI systems.

Optimize the prompt to:
1. Fix all identified failures and weaknesses
2. Address security vulnerabilities
3. Ensure compliance with regulations
4. Improve edge case handling
5. Enhance error recovery mechanisms
6. Strengthen behavioral guardrails
7. Improve clarity and specificity
8. Add missing instructions for identified gaps
9. Maintain the core purpose and tone
10. Make it production-grade and enterprise-ready

Be specific and actionable. Every change must address a real issue.

Return ONLY valid JSON.
Do not include markdown.
`;

  const failureDescriptions = failedTests.map(f =>
    `Scenario: ${f.scenario}
Category: ${f.category}
Risk: ${f.risk_level}
Reason: ${f.evaluation_reason}
Weaknesses: ${f.weaknesses?.join(", ") || "N/A"}
Recommendations: ${f.recommendations?.join(", ") || "N/A"}`
  ).join("\n\n");

  const securityIssues = criticalIssues
    .flatMap(e => e.security_issues || [])
    .filter((v, i, a) => a.indexOf(v) === i);
  
  const complianceIssues = criticalIssues
    .flatMap(e => e.compliance_issues || [])
    .filter((v, i, a) => a.indexOf(v) === i);

  const userPrompt = `
Optimize this Voice AI agent prompt for production deployment:

Original Prompt:
${originalPrompt}

---

Test Results Summary:
- Total Tests: ${evaluations.length}
- Failed: ${failedTests.length}
- Critical Issues: ${criticalIssues.length}
- Security Issues: ${securityIssues.length}
- Compliance Issues: ${complianceIssues.length}

---

Failures to Address:
${failureDescriptions}

${securityIssues.length > 0 ? `\nSecurity Issues:\n${securityIssues.join("\n")}` : ""}

${complianceIssues.length > 0 ? `\nCompliance Issues:\n${complianceIssues.join("\n")}` : ""}

---

Provide an optimized prompt that addresses ALL issues above.

Return JSON:

{
  "optimized_prompt": "Complete rewritten prompt with all improvements",
  "changes": [
    {
      "description": "Specific change made",
      "reason": "Why this change was needed",
      "addresses": "Which failure(s) this fixes"
    }
  ],
  "expected_improvement": "Summary of expected improvements",
  "confidence_score": "1-10 rating of optimization quality",
  "production_ready": true or false,
  "remaining_risks": ["Any risks that couldn't be fully addressed"]
}
`;

  const response = await callLLM(systemPrompt, userPrompt);

  return safeJSONParse(response);
}