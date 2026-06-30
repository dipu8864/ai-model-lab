// Embeds the demo corpus and upserts it into Qdrant.
const embeddingService = require("../services/embeddingService");
const qdrantService = require("../services/qdrantService");
const documents = require("../data/documents");

async function insertDocuments() {
  const vectors = await embeddingService.getEmbeddings(
    documents.map((doc) => doc.text)
  );

  const points = documents.map((doc, i) => ({
    id: doc.id,
    vector: vectors[i],
    payload: { text: doc.text }
  }));

  await qdrantService.upsertPoints(points);
  console.log(`Inserted ${points.length} documents.`);
}

insertDocuments().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
