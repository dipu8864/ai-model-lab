const ollamaService = require("../services/ollamaService");
const searchService = require("../services/searchService");

class AIController {
  async ask(req, res) {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({
          success: false,
          message: "Prompt is required"
        });
      }

      console.log("Request received:", new Date());
      const start = Date.now();

      const answer = await ollamaService.generateCompletion(prompt);
      const end = Date.now();

      console.log(`Completed in ${(end - start) / 1000} seconds`);

      return res.json({
        success: true,
        answer: answer
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async summarize(req, res) {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({
          success: false,
          message: "Text is required"
        });
      }

      const summary = await ollamaService.summarizeText(text);

      return res.json({
        success: true,
        summary: summary.trim()
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async search(req, res) {
    try {
      const { query, topK = 5 } = req.body;

      if (!query) {
        return res.status(400).json({
          success: false,
          message: "Query is required"
        });
      }

      const results = await searchService.searchDocuments(query, topK);

      return res.json({
        success: true,
        results: results
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new AIController();
