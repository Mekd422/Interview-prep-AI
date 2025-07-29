const {GoogleGenAi} = require("@google/genai");
const {conceptExplanationPromp} = require("../utils/prompts");

const ai = new GoogleGenAi({apiKey: process.env.GEMINI_API_KEY});

// generate interview questions and answers using gemeni
// post /api/ai/generate-questions
// access: private

const generateInterviewQuestions = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            message: "failed to generate questions",
            error: error.message,
        })
    }
    
}

// generate explanation for an interview question
// post /api/ai/generate-explanation
// access: private

const generateConceptExplanation = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            message: "failed to generate questions",
            error: error.message,
        })
    }
}

module.exports = {generateConceptExplanation, generateInterviewQuestions};