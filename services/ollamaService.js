const axios = require("axios");
const ollamaConfig = require("../config/ollama");

class OllamaService {
  constructor() {
    this.baseURL = ollamaConfig.baseURL;
    this.client = axios.create({
      baseURL: this.baseURL
    });
  }

  async generateCompletion(prompt, model = ollamaConfig.defaultModel) {
    try {
      const response = await this.client.post("/api/generate", {
        model,
        prompt,
        stream: false,
        options: ollamaConfig.defaultOptions
      });

      return response.data.response;
    } catch (error) {
      throw new Error(`Ollama completion error: ${error.message}`);
    }
  }

  async summarizeText(text, model = ollamaConfig.summaryModel) {
    const prompt = `Summarize the following text in a concise manner:\n\n${text}`;
    return this.generateCompletion(prompt, model);
  }
}

module.exports = new OllamaService();
