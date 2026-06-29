const ollamaService = require("../services/ollamaService");
const searchService = require("../services/searchService");
const { HttpError } = require("../middleware/errorHandler");

function require_(value, name) {
  if (!value) {
    throw new HttpError(400, `${name} is required`);
  }
  return value;
}

class AIController {
  async ask(req, res) {
    const prompt = require_(req.body.prompt, "Prompt");
    const answer = await ollamaService.generateCompletion(prompt);
    res.json({ success: true, answer });
  }

  async summarize(req, res) {
    const text = require_(req.body.text, "Text");
    const summary = await ollamaService.summarizeText(text);
    res.json({ success: true, summary });
  }

  async search(req, res) {
    const { topK = 5 } = req.body;
    const query = require_(req.body.query, "Query");
    const results = await searchService.searchDocuments(query, topK);
    res.json({ success: true, results });
  }
}

module.exports = new AIController();
