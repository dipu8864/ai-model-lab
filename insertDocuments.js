const axios = require("axios");
const documents = require("./documentsNew");

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

async function insertDocuments() {

  const points = [];

  for (const doc of documents) {

    const vector =
      await getEmbedding(doc.text);

    points.push({
      id: doc.id,
      vector,
      payload: {
        text: doc.text
      }
    });
    console.log(points);
  }

  await axios.put(
    "http://localhost:6333/collections/documents/points",
    {
      points
    }
  );

  console.log("Documents inserted.");
}

insertDocuments();