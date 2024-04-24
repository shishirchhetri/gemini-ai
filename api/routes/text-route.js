const router = require("express").Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fs = require("fs");
const path = require('path');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/text", async (req, res) => {
  //prompt from frontend
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).send({ error: "prompt is required!" });
  }
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  res.send({ text });
});

router.post("/images", upload.array("files", 5), async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).send({ error: "Prompt is required!" });
    }
  
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const imageParts = req.files.map((file) => ({
      inlineData: {
        data: fs.readFileSync(file.path).toString("base64"),
        mimeType: file.mimetype,
      },
    }));
  
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    res.send({ text });
  });

module.exports = router;
