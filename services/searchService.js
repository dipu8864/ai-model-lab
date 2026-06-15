const embeddingService = require("./embeddingService");
const documents = require("../documents");

class SearchService {
  async searchDocuments(query, topK = 5) {
    try {
      const queryVector = await embeddingService.getEmbedding(query);
      const results = [];

      for (const doc of documents) {
        const docVector = await embeddingService.getEmbedding(doc);
        const score = embeddingService.cosineSimilarity(queryVector, docVector);
        
        results.push({
          document: doc,
          score: score
        });
      }

      // Sort by score descending and return top K
      return results
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);
    } catch (error) {
      throw new Error(`Search error: ${error.message}`);
    }
  }
}

module.exports = new SearchService();
