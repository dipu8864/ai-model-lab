// Runs a semantic search against Qdrant for a query passed on the command line.
const embeddingService = require("../services/embeddingService");
const qdrantService = require("../services/qdrantService");

async function search(query) {
  const vector = await embeddingService.getEmbedding(query);
  const results = await qdrantService.search(vector, 3);
  console.log(JSON.stringify(results, null, 2));
}

const query = process.argv.slice(2).join(" ") || "How do I improve PostgreSQL performance?";
console.log("Searching for:", query);
search(query).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
