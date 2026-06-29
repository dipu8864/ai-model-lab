// In-memory semantic search demo over the local corpus (no vector DB).
const searchService = require("../services/searchService");

async function search(query) {
  const results = await searchService.searchDocuments(query);
  console.table(results);
}

const query = process.argv.slice(2).join(" ") || "How do I deploy applications easily?";
console.log("Searching for:", query);
search(query).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
