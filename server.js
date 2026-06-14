const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log("Request received:", new Date());
    const start = Date.now();

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "qwen3",
      prompt: prompt,
      stream: false,
    });

    const end = Date.now();

    console.log(`Completed in ${(end - start) / 1000} seconds`);

    return res.json({
      success: true,
      answer: response.data.response,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("AI Server Running on Port 3000");
});
