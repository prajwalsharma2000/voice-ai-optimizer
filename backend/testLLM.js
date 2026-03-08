import { callLLM } from "./llm/llmClient.js";

const run = async () => {
  const result = await callLLM(
    "You are a helpful assistant",
    "Explain what a voice AI agent is in one sentence"
  );

  console.log(result);
};

run();