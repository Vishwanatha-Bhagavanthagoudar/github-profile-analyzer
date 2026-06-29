require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db");

const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "GitHub Profile Analyzer API"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});