const router = require('express').Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


router.post('/generate' ,async (req, res)=>{
    //prompt from frontend
    const {prompt} = req.body;
    if(!prompt){
        return res.status(400).send({error: 'prompt is required!'})
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send({text});
})

module.exports = router