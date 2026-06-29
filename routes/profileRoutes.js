const express = require("express");

const router = express.Router();

const {

    analyzeProfile,

    fetchAllProfiles,

    fetchSingleProfile

} = require("../controllers/profileController");

router.post("/analyze", analyzeProfile);

router.get("/", fetchAllProfiles);

router.get("/:username", fetchSingleProfile);

module.exports = router;