const axios = require("axios");
const ollamaConfig = require("../config/ollama");

class EmbeddingService {
  constructor() {
    this.model = ollamaConfig.embeddingModel;
    this.client = axios.create({ baseURL: ollamaConfig.baseURL });
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

  // Embed many texts concurrently instead of one-by-one.
  async getEmbeddings(texts) {
    return Promise.all(texts.map((text) => this.getEmbedding(text)));
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
