const {GoogleGenAi} = require("@google/genai");
const {conceptExplanationPromp, questionAnswerPrompt, conceptExplainPrompt} = require("../utils/prompts");

const ai = new GoogleGenAi({apiKey: process.env.GEMINI_API_KEY});

// generate interview questions and answers using gemeni
// post /api/ai/generate-questions
// access: private

const generateInterviewQuestions = async (req, res) => {
    try {
        const {role, experience, topicstofocus, numberofquestions} = req.body;

        if(!role || !experience || !topicstofocus || !numberofquestions) {
            return res.status(400).json({message: "missing required fields"});
        }

        const prompt = questionAnswerPrompt(role, experience, topicstofocus, numberofquestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        })

        let rawtext = response.text;

        //clean it
        const cleanedText = rawtext
        .replace(/^```json\s*/, "")
        .replace(/```$/,"")
        .trim();

        // now safe to parse
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
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
        const {question} = req.body;

        if(!question) {
            return res.status(400).json({message: "missing required fields"});
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-liter",
            contents: prompt,
        })

        let rawtext = response.text;

        // clean it 
        const cleanedText = rawtext
        .replace(/^```json\s*/, "")
        .replace(/```$/,"")
        .trim();

        // now safe to parse
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "failed to generate questions",
            error: error.message,
        })
    }
}

module.exports = {generateConceptExplanation, generateInterviewQuestions};