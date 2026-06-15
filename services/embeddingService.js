const axios = require("axios");
const ollamaConfig = require("../config/ollama");

class EmbeddingService {
  constructor() {
    this.baseURL = ollamaConfig.baseURL;
    this.model = ollamaConfig.embeddingModel;
    this.client = axios.create({
      baseURL: this.baseURL
    });
  }

  async getEmbedding(text) {
    try {
      const response = await this.client.post("/api/embeddings", {
        model: this.model,
        prompt: text
      });

      return response.data.embedding;
    } catch (error) {
      throw new Error(`Embedding error: ${error.message}`);
    }
  }

  cosineSimilarity(a, b) {
    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

module.exports = new EmbeddingService();
