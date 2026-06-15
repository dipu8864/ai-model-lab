const axios = require("axios");

async function createEmbedding(text) {

    const response = await axios.post(
        "http://localhost:11434/api/embeddings",
        {
            model: "nomic-embed-text",
            prompt: text
        }
    );

    console.log("Vector Length:",
        response.data.embedding.length);

    console.log(
        response.data.embedding.slice(0, 10)
    );
}

/* createEmbedding(
    "PostgreSQL indexing improves query performance"
); */

createEmbedding(
"How to cook biryani"
);