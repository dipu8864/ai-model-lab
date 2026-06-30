// Retrieval-augmented generation demo: retrieve context from Qdrant, then
// answer the question with the configured RAG model.
const embeddingService = require("../services/embeddingService");
const qdrantService = require("../services/qdrantService");
const ollamaService = require("../services/ollamaService");
const ollamaConfig = require("../config/ollama");

async function retrieveContext(question) {
  const vector = await embeddingService.getEmbedding(question);
  const results = await qdrantService.search(vector, 3);
  return results.map((item) => item.payload.text).join("\n");
}

function buildPrompt(question, context) {
  return `You are a helpful assistant.

Answer ONLY using the context below.

Context:
${context}

Question:
${question}

Answer:`;
}

async function ask(question) {
  const context = await retrieveContext(question);
  console.log("\nRetrieved Context:\n");
  console.log(context);

  const answer = await ollamaService.generateCompletion(
    buildPrompt(question, context),
    ollamaConfig.ragModel
  );
  console.log("\nAnswer:\n");
  console.log(answer);
}

const question = process.argv.slice(2).join(" ") || "How do I improve PostgreSQL performance?";
ask(question).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
