const embeddingService = require("./embeddingService");
const documents = require("../data/documents");

class SearchService {
  constructor() {
    // Cache of { document, vector } built once, then reused across queries.
    this.indexPromise = null;
  }

  // Embed every document once (concurrently) and memoize the result.
  buildIndex() {
    if (!this.indexPromise) {
      this.indexPromise = embeddingService
        .getEmbeddings(documents.map((doc) => doc.text))
        .then((vectors) =>
          documents.map((doc, i) => ({ document: doc.text, vector: vectors[i] }))
        )
        .catch((error) => {
          // Reset so a transient failure doesn't poison the cache permanently.
          this.indexPromise = null;
          throw error;
        });
    }

    return this.indexPromise;
  }

  async searchDocuments(query, topK = 5) {
    try {
      const [queryVector, index] = await Promise.all([
        embeddingService.getEmbedding(query),
        this.buildIndex()
      ]);

      return index
        .map(({ document, vector }) => ({
          document,
          score: embeddingService.cosineSimilarity(queryVector, vector)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);
    } catch (error) {
      throw new Error(`Search error: ${error.message}`);
    }
  }
}

module.exports = new SearchService();
