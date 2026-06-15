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
      console.log("Request received:", new Date());
      const start = Date.now();

      const response = await this.client.post("/api/generate", {
        model,
        prompt,
        stream: false,
        options: ollamaConfig.defaultOptions
      });

      const end = Date.now();
      console.log(`Completed in ${(end - start) / 1000} seconds`);

      return response.data.response;
    } catch (error) {
      throw new Error(`Ollama completion error: ${error.message}`);
    }
  }

  async summarizeText(text, model = ollamaConfig.summaryModel) {
    try {
      console.log("Summarize request received:", new Date());
      const start = Date.now();

      const prompt = `Summarize the following text in a concise manner:\n\n${text}`;
      const response = await this.client.post("/api/generate", {
        model,
        prompt,
        stream: false,
        options: ollamaConfig.defaultOptions
      });

      const end = Date.now();
      console.log(`Summarize completed in ${(end - start) / 1000} seconds`);

      return response.data.response.trim();
    } catch (error) {
      throw new Error(`Ollama summarize error: ${error.message}`);
    }
  }
}

module.exports = new OllamaService();
