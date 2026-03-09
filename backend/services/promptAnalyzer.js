import { callLLM, safeJSONParse } from "../llm/llmClient.js";

export async function analyzePrompt(prompt) {

const systemPrompt = `
You are an expert AI prompt engineer specializing in Voice AI agent optimization.

Analyze the provided Voice AI agent prompt with deep technical insight.

Evaluate:
- Core purpose and business objectives
- Conversational tone and brand alignment
- Functional capabilities and limitations
- Edge case handling and error recovery
- Compliance and safety considerations
- User experience quality
- Scalability and maintainability

Return ONLY valid JSON.
Do NOT include explanations, markdown, or code blocks.
`;

  const userPrompt = `
Analyze this Voice AI agent prompt for enterprise production deployment:

Agent Prompt:
${prompt}

Provide comprehensive analysis in this JSON format:

{
  "purpose": "Clear business purpose and primary use case",
  "tone": "Conversational tone and brand personality",
  "capabilities": ["List of core capabilities"],
  "improvement_areas": ["Critical gaps and weaknesses"],
  "goal": "Primary objective of the agent",
  "requiredActions": ["Key actions the agent must perform"],
  "behaviorRules": ["Behavioral guidelines and constraints"],
  "successCriteria": [
    "Agent responds within 2 seconds",
    "Agent maintains professional tone",
    "Agent handles objections gracefully",
    "Agent collects required information",
    "Agent provides accurate information",
    "Agent escalates appropriately",
    "Agent follows compliance guidelines",
    "Agent recovers from errors smoothly"
  ],
  "riskFactors": ["Potential risks and failure modes"],
  "complianceIssues": ["Regulatory or policy concerns"],
  "scalabilityScore": "1-10 rating with justification"
}
`;

  const response = await callLLM(systemPrompt, userPrompt);

  console.log("LLM RAW RESPONSE:", response);

  return safeJSONParse(response);
}