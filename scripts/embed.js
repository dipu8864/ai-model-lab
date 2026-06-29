// Prints the embedding length and a preview for a piece of text (debug helper).
const embeddingService = require("../services/embeddingService");

async function embed(text) {
  const vector = await embeddingService.getEmbedding(text);
  console.log("Vector length:", vector.length);
  console.log(vector.slice(0, 10));
}

const text = process.argv.slice(2).join(" ") || "How to cook biryani";
embed(text).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
