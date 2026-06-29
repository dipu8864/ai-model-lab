// Creates the Qdrant collection used to store document embeddings.
const qdrantService = require("../services/qdrantService");

qdrantService
  .createCollection()
  .then((data) => console.log(data))
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
