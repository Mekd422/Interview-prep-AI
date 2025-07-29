require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connect } = require("http2");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sessionsRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes")

const app = express();

// middleware to handle CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["content-Type", "Authorization"]
    })
);

connectDB();

// middleware
app.use(express.json());

//routes

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("api/questions", questionRoutes);





//server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

