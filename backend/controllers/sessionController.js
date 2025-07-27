const Session = require("../models/Session");
const Question = require("../models/Question");


// create a new session and linked questions
// route: POST /api/sessions/create
// access: Private
exports.createSessionsc = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
};

// get all sessions for the logged in user
// route: GET /api/sessions/my-sessions
// access: Private
exports.getMySessions = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
};

// get session by id with populated questions
// route: GET /api/sessions/:id
// access: Private
exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id).populate("questions");
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        res.status(200).json(session);
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

