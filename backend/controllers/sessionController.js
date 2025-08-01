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
// has some problem
exports.getMySessions = async (req, res) => {
    console.log("💡 getMySessions called");
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        console.log("Request user:", req.user);

        const sessions = await Session.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            
        res.status(200).json(sessions);
    } catch (error) {
  console.error("Error in getMySessions:", error.message, error.stack);
  res.status(500).json({ message: "Server error", success: false, error: error.message });
}

};

// get session by id with populated questions
// route: GET /api/sessions/:id
// access: Private
exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate({
                path: "questions",
                options: { sort: {isPinned: -1, createdAt: 1}}
            })
            .exec();

        if (!session) {
            return res.status(400).json({success: false, message: "session not found"});
        }

        res.status(200).json({success: true, session})
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

        // check if teh logged in user owns this session
        if(session.user.toString() !== req.user.id) {
            return res.status(401).json({message: "not authorized to delete this session"})
        }
        
        // first, delete all linked questions
        await Question.deleteMany({ session: session._id });
        
        // then, delete session
        await session.deleteOne();
        
        res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
}

