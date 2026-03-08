import { callLLM, safeJSONParse } from "../llm/llmClient.js";

export async function analyzePrompt(prompt) {

const systemPrompt = `
You are an AI system that analyzes Voice AI agent prompts.

Return ONLY valid JSON.
Do NOT include explanations.
Do NOT include markdown.
Do NOT wrap the JSON in code blocks.
`;

  const userPrompt = `
Analyze the following Voice AI agent prompt and extract:

Agent Prompt:
${prompt}

Return JSON in this format:

{
  "purpose": "",
  "tone": "",
  "capabilities": [],
  "improvement_areas": [],
  "goal": "",
  "requiredActions": [],
  "behaviorRules": [],
  "successCriteria": []
}
`;

  const response = await callLLM(systemPrompt, userPrompt);

  console.log("LLM RAW RESPONSE:", response);

  return safeJSONParse(response);
}