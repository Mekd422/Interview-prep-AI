const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc add additonal questions to a existing session
// post /api/questions/add
// acess : private

exports.addQuestionsToSession = async (req,  res) =>{
    try {
        const {sessionId, questions} = req.body;

        if(!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({message: "invalid input data"});
        }

        const session = await Session.findById(sessionId);

        if(!session) {
            return res.status(400).json({message: "session not found"});
        }

        // create new questions
        const createdQuestions = await questions.insertMany(
            questions.map((q) =>({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );

        //update session to include new question ids
        session.questions.push(...createdQuestions.map((q) > q._id));
        await session.save();

        res.status(201).json(createdQuestions);
    } catch (error) {
        res.status(500).json({message: "server error"});
    }
}


// @desc pin or unpin a question
// post /api/questions/:id/pin
// acess : private

exports.togglePinQuestion = async (req,  res) =>{
    try {
        const question = await Question.findById(req.params.id);

        if(!question) {
            return res.status(400).json({success: false, mesage: "question not found"});
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({success: true, question});
    } catch (error) {
        res.status(500).json({message: "server error"});
    }
}


// @desc update a note for a question
// post /api/questions/:id/note
// acess : private

exports.updateQuestionNote = async (req,  res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({message: "server error"});
    }
}
