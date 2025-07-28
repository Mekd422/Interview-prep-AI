const Session = require("../models/Session");
const Question = require("../models/Question");
const user = require("../models/user");


// create a new session and linked questions
// route: POST /api/sessions/create
// access: Private
exports.createSession = async (req, res) => {
    try {
        const {role, experience, topicsToFocus, description, questions} = req.body;
        const userId = req.user._id;

        

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                return await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer
                })
            })
        )

        session.questions = questionDocs;
        await session.save();

        res.status(201).json({success: true, session});

    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
};

// get all sessions for the logged in user
// route: GET /api/sessions/my-sessions
// access: Private
exports.getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({user: req.user.id})
        .sort({createdAt: -1})
        
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
};

// get session by id with populated questions
// route: GET /api/sessions/:id
// access: Private
exports.getSessionById = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
};

// delete a session and its linked questions
// route: DELETE /api/sessions/:id
// access: Private

exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        
        // delete linked questions
        await Question.deleteMany({ session: session._id });
        
        // delete session
        await session.remove();
        
        res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
}

