const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/ask", async (req, res) => {
  try {

    const prompt = req.body.prompt;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "gemma4:latest",
        prompt: prompt,
        stream: false
      }
    );

    return res.json({
      success: true,
      answer: response.data.response
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

app.listen(3000, () => {
  console.log("AI Server Running on Port 3000");
});