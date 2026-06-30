require("dotenv").config();

module.exports = {
  baseURL: process.env.QDRANT_BASE_URL || "http://localhost:6333",
  collection: process.env.QDRANT_COLLECTION || "documents",
  // nomic-embed-text produces 768-dimensional vectors
  vectorSize: parseInt(process.env.QDRANT_VECTOR_SIZE || "768", 10),
  distance: process.env.QDRANT_DISTANCE || "Cosine"
};
