require("dotenv").config();

module.exports = {
  baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  defaultModel: process.env.OLLAMA_DEFAULT_MODEL || "qwen3.5:4b",
  summaryModel: process.env.OLLAMA_SUMMARY_MODEL || "qwen3.5:4b",
  embeddingModel: process.env.OLLAMA_EMBEDDING_MODEL || "nomic-embed-text",
  ragModel: process.env.OLLAMA_RAG_MODEL || "deepseek-r1:8b",
  defaultOptions: {
    temperature: parseFloat(process.env.OLLAMA_TEMPERATURE || 0.2)
  }
};
