import axios from "axios";

const API = axios.create({
   baseURL: "https://voice-ai-optimizer-api.onrender.com/api"
});

export const runCopilot = (prompt) =>
  API.post("/run-copilot", { prompt });