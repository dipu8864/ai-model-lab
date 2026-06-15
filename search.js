const axios = require("axios");
const documents = require("./documents");
async function getEmbedding(text) {

  const response = await axios.post(
    "http://localhost:11434/api/embeddings",
    {
      model: "nomic-embed-text",
      prompt: text
    }
  );

  return response.data.embedding;
}
function cosineSimilarity(a, b) {

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {

    dot += a[i] * b[i];

    normA += a[i] * a[i];

    normB += b[i] * b[i];
  }

  return dot / (
    Math.sqrt(normA) *
    Math.sqrt(normB)
  );
}

async function search(query) {

  const queryVector =
    await getEmbedding(query);

  const results = [];

  for (const doc of documents) {

    const docVector =
      await getEmbedding(doc);

    const score =
      cosineSimilarity(
        queryVector,
        docVector
      );

    results.push({
      document: doc,
      score
    });
  }

  results.sort(
    (a, b) => b.score - a.score
  );

  console.table(results);
}
var searchTxt = "How do I deploy applications easily?";
console.log("Searching for:", searchTxt);
search(
  searchTxt
);