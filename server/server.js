const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const app = express();
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json());

// Initialize with the new router URL
const hf = new HfInference(process.env.HF_TOKEN, {
    baseUrl: "https://router.huggingface.co"
});

app.post("/api/generate", async (req, res) => {
  try {
    const { message } = req.body

    const response = await hf.chatCompletion({
        model: "meta-llama/Llama-3.2-3B-Instruct",
        messages: [{ role: "user", content: message }],
        max_tokens: 500,
    });

    const data = await response.json();

    console.log("HF RAW RESPONSE:", data) // 👈 IMPORTANT

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || "HuggingFace error"
      })
    }

    res.json({
      reply: response.choices.message.content || ""
    })

  } catch (error) {
    console.error("SERVER ERROR:", error)
    res.status(500).json({ error: "Server crashed" })
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
