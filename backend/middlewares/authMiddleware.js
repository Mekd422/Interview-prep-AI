const jwt = require("jsonwebtoken");
const User = require("../models/user");

//middleware to protect routes
const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if(token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } else {
            res.status(401).json({ message: "Not authorized, no token" });
        }
    } catch (error) {
        res.status(401).json({ message: "token failed" });
    }
};

module.exports = { protect };   