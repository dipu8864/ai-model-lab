const axios = require("axios");
const ollamaConfig = require("../config/ollama");

class OllamaService {
  constructor() {
    this.client = axios.create({ baseURL: ollamaConfig.baseURL });
  }

  // Shared generation call with timing logs and error wrapping.
  async generate(prompt, { model = ollamaConfig.defaultModel, label = "Generate" } = {}) {
    const start = Date.now();
    console.log(`${label} request received:`, new Date().toISOString());

    try {
      const response = await this.client.post("/api/generate", {
        model,
        prompt,
        stream: false,
        options: ollamaConfig.defaultOptions
      });

      console.log(`${label} completed in ${(Date.now() - start) / 1000} seconds`);
      return response.data.response;
    } catch (error) {
      throw new Error(`Ollama ${label.toLowerCase()} error: ${error.message}`);
    }
  }

  generateCompletion(prompt, model = ollamaConfig.defaultModel) {
    return this.generate(prompt, { model, label: "Generate" });
  }

  async summarizeText(text, model = ollamaConfig.summaryModel) {
    const prompt = `Summarize the following text in a concise manner:\n\n${text}`;
    const summary = await this.generate(prompt, { model, label: "Summarize" });
    return summary.trim();
  }
}

module.exports = new OllamaService();
