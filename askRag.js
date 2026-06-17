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
async function retrieveDocuments(question) {

    const vector =
        await getEmbedding(question);

    const response = await axios.post(
        "http://localhost:6333/collections/documents/points/search",
        {
            vector,
            limit: 3,
            with_payload: true
        }
    );

    return response.data.result;
}
function buildContext(results) {

    return results
        .map(item => item.payload.text)
        .join("\n");
}
async function askLLM(question, context) {

    const prompt = `
You are a helpful assistant.

Answer ONLY using the context below.

Context:
${context}

Question:
${question}

Answer:
`;

    const response = await axios.post(
        "http://localhost:11434/api/generate",
        {
            model: "deepseek-r1:8b",
            prompt,
            stream: false
        }
    );

    return response.data.response;
}
async function ask(question) {

    const docs =
        await retrieveDocuments(question);

    const context =
        buildContext(docs);

    console.log("\nRetrieved Context:\n");
    console.log(context);

    const answer =
        await askLLM(
            question,
            context
        );

    console.log("\nAnswer:\n");
    console.log(answer);
}

ask(
    "How do I improve PostgreSQL performance?"
);