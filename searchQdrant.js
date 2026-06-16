const axios = require("axios");

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

async function search(query) {

  const vector =
    await getEmbedding(query);

  const response = await axios.post(
    "http://localhost:6333/collections/documents/points/search",
    {
      vector,
      limit: 3
    }
  );

  console.log(
    JSON.stringify(
      response.data,
      null,
      2
    )
  );
}

search(
  "How do I improve PostgreSQL performance?"
);