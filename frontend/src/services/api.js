import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const runCopilot = (prompt) =>
  API.post("/run-copilot", { prompt });