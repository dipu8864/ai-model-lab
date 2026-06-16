const axios = require("axios");

async function createCollection() {

    const response = await axios.put(
        "http://localhost:6333/collections/documents",
        {
            vectors: {
                size: 768,
                distance: "Cosine"
            }
        }
    );

    console.log(response.data);
}

createCollection();