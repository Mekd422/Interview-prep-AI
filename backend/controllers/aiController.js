require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {conceptExplanationPromp, questionAnswerPrompt, conceptExplainPrompt} = require("../utils/prompts");


const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-1.5-pro" if preferred
        const result = await model.generateContent(prompt);
        const response = result.response;
        let rawtext = await response.text();
      


        //clean it
        let cleanedText = rawtext;
        if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        }

        const jsonMatch = cleanedText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        if (!jsonMatch) {
        throw new Error("No valid JSON found");
        }
        const data = JSON.parse(jsonMatch[0]);

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

        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;

        const rawtext = await response.text();

        // clean it 
        let cleanedText = rawtext;
        if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        }

        // now safe to parse
        const jsonMatch = cleanedText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        if (!jsonMatch) {
        throw new Error("No valid JSON found");
        }
        const data = JSON.parse(jsonMatch[0]);


        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "failed to generate questions",
            error: error.message,
        })
    }
}

module.exports = {generateConceptExplanation, generateInterviewQuestions};