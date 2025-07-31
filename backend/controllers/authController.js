const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//generate jwt token
const generateToken = (userId) => {
    return jwt.sign({ id : userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
}


// register a new user
// route: POST /api/auth/register
// access: Public

const registerUser = async (req, res) => {

    try {
        const { name, email, password, profileImageUrl } = req.body;

        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        });

        // return user data and token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }

};

// login user
// route: POST /api/auth/login
// access: Public
const loginUser = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    // return user data and token
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        token: generateToken(user._id)
    });


    res.status(500).json({ message: "Server error" });

};

// get user profile
// route: GET /api/auth/profile
// access: Private
const getUserProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
       }

};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile};
