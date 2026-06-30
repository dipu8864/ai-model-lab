# AI Model Lab

An Express.js application that provides a REST API for interacting with Ollama language models. This project includes endpoints for text generation, summarization, and semantic search capabilities.

## Features

- **Text Generation** - Generate completions using Ollama models
- **Text Summarization** - Summarize long texts concisely
- **Semantic Search** - Search through documents using vector embeddings
- **Clean Architecture** - Organized with services, controllers, and routes
- **Environment Configuration** - Configurable models and API endpoints

## Prerequisites

- Node.js (v14 or higher)
- Ollama installed and running locally (http://localhost:11434)
- npm or yarn package manager

### Required Ollama Models

- `qwen3.5:4b` - For text generation and summarization
- `nomic-embed-text` - For embeddings and semantic search

Pull models using:

```bash
ollama pull qwen3.5:4b
ollama pull nomic-embed-text
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dipu8864/ai-model-lab.git
cd ai-model-lab
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (optional, for custom configuration):

```env
PORT=3000
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_DEFAULT_MODEL=qwen3.5:4b
OLLAMA_SUMMARY_MODEL=qwen3.5:4b
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
OLLAMA_TEMPERATURE=0.2
```

## Running the Application

**Development mode** (with auto-reload):

```bash
npm run dev
```

**Production mode**:

```bash
npm start
```

The server will start on `http://localhost:3000`

## Project Structure

```
ai-model-lab/
├── config/
│   ├── ollama.js                 # Ollama configuration
│   └── qdrant.js                 # Qdrant configuration
├── services/
│   ├── ollamaService.js          # Ollama generation client
│   ├── embeddingService.js       # Embeddings + cosine similarity
│   ├── searchService.js          # In-memory semantic search (cached index)
│   └── qdrantService.js          # Qdrant vector DB client
├── controllers/
│   └── aiController.js           # Request handlers
├── routes/
│   └── aiRoutes.js               # API route definitions
├── middleware/
│   ├── asyncHandler.js           # Async route wrapper
│   └── errorHandler.js           # 404 + centralized error responses
├── data/
│   └── documents.js              # Sample corpus (single source of truth)
├── scripts/                      # Standalone CLI helpers (see Scripts below)
├── server.js                     # Express app entry point
├── package.json
└── README.md
```

## Scripts

Standalone CLI helpers (most accept text as command-line arguments):

```bash
npm run qdrant:create     # Create the Qdrant collection
npm run qdrant:insert     # Embed the corpus and upsert into Qdrant
npm run qdrant:search "your query"   # Vector search against Qdrant
npm run rag "your question"          # Retrieval-augmented generation demo
npm run search:local "your query"    # In-memory semantic search demo
npm run embed "some text"            # Print an embedding preview
```

## API Endpoints

### 1. Ask (Text Generation)

Generate text completions using the model.

**Endpoint:**

```
POST /ask
```

**Request Body:**

```json
{
  "prompt": "What is Node.js and why is it used?"
}
```

**Response:**

```json
{
  "success": true,
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine..."
}
```

---

### 2. Summarize

Summarize long text into concise form.

**Endpoint:**

```
POST /summarize
```

**Request Body:**

```json
{
  "text": "PostgreSQL is a powerful open source relational database management system. It supports advanced indexing, transactions, JSON data types and many enterprise features."
}
```

**Response:**

```json
{
  "success": true,
  "summary": "PostgreSQL is an open-source relational database with advanced features like indexing, transactions, and JSON support."
}
```

---

### 3. Search (Semantic Search)

Search through documents using semantic similarity.

**Endpoint:**

```
POST /search
```

**Request Body:**

```json
{
  "query": "database indexing",
  "topK": 3
}
```

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "document": "PostgreSQL indexing improves query performance",
      "score": 0.89
    },
    {
      "document": "Node.js is a JavaScript runtime",
      "score": 0.45
    }
  ]
}
```

## Testing with Hoppscotch

1. Open [Hoppscotch](https://hoppscotch.io)
2. Create new requests with the endpoints above
3. Set `Content-Type: application/json` header
4. Test the API responses

## Console Output

The application logs timing information for debugging:

- Request timestamps
- Execution time in seconds

Example:

```
Request received: 2026-06-15T10:30:45.123Z
Completed in 2.456 seconds
```

## Environment Variables

| Variable                 | Default                | Description                  |
| ------------------------ | ---------------------- | ---------------------------- |
| `PORT`                   | 3000                   | Server port                  |
| `OLLAMA_BASE_URL`        | http://localhost:11434 | Ollama API endpoint          |
| `OLLAMA_DEFAULT_MODEL`   | qwen3.5:4b             | Model for generation         |
| `OLLAMA_SUMMARY_MODEL`   | qwen3.5:4b             | Model for summarization      |
| `OLLAMA_EMBEDDING_MODEL` | nomic-embed-text       | Model for embeddings         |
| `OLLAMA_RAG_MODEL`       | deepseek-r1:8b         | Model for the RAG script     |
| `OLLAMA_TEMPERATURE`     | 0.2                    | Model temperature (0-1)      |
| `QDRANT_BASE_URL`        | http://localhost:6333  | Qdrant API endpoint          |
| `QDRANT_COLLECTION`      | documents              | Qdrant collection name       |
| `QDRANT_VECTOR_SIZE`     | 768                    | Embedding vector dimensions  |
| `QDRANT_DISTANCE`        | Cosine                 | Vector distance metric       |

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Successful request
- `400` - Bad request (missing required fields)
- `500` - Server error (Ollama connection or processing error)

Error response:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Technologies Used

- **Express.js** - Web framework
- **Axios** - HTTP client
- **Ollama** - Language model inference
- **Node.js** - Runtime environment

## License

ISC

## Author

[Dipankar](https://github.com/dipu8864)

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## Troubleshooting

### Connection refused errors

- Ensure Ollama is running: `ollama serve`
- Check if Ollama is accessible at `http://localhost:11434`

### Model not found errors

- Pull required models:
  ```bash
  ollama pull qwen3.5:4b
  ollama pull nomic-embed-text
  ```

### Slow responses

- First request may be slow as the model loads into memory
- Subsequent requests are faster
- Adjust `OLLAMA_TEMPERATURE` for consistency vs creativity trade-off
