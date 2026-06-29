const { getGithubProfile } = require("../services/githubService");
const calculateScore = require("../utils/calculateScore");
const {
    insertProfile,
    getAllProfiles,
    getProfileByUsername
} = require("../models/profileModel");
// Analyze GitHub Profile
const analyzeProfile = async (req, res) => {

    try {

        const { username } = req.body;

        // Validate username
        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is required"
            });
        }

        // Fetch profile from GitHub
        const profile = await getGithubProfile(username);

        // Calculate account age
        const createdYear = new Date(profile.created_at).getFullYear();
        const currentYear = new Date().getFullYear();

        const accountAge = currentYear - createdYear;

        // Calculate score
        const score = calculateScore(profile);

        // Data for MySQL
        const values = [
            profile.login,
            profile.name,
            profile.bio,
            profile.avatar_url,
            profile.public_repos,
            profile.followers,
            profile.following,
            profile.company,
            profile.location,
            profile.blog,
            profile.twitter_username,
            profile.created_at.substring(0, 10),
            accountAge,
            score
        ];

        // Save in database
        await insertProfile(values);

res.status(200).json({
    success: true,
    message: "Profile analyzed successfully",
    data: {
        username: profile.login,
        name: profile.name,
        followers: profile.followers,
        following: profile.following,
        publicRepos: profile.public_repos,
        score,
        accountAge
    }
});

    } catch (error) {

        res.status(404).json({

            success: false,

            message: error.message

        });

    }

};
//Get All Profiles
const fetchAllProfiles = async (req, res) => {

    try {

        const profiles = await getAllProfiles();

        res.json({
            success: true,
            count: profiles.length,
            data: profiles
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const fetchSingleProfile = async (req, res) => {

    try {

        const { username } = req.params;

        const profiles = await getProfileByUsername(username);

        if (profiles.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });

        }

        res.json({
            success: true,
            data: profiles[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
module.exports = {
    analyzeProfile,
    fetchAllProfiles,
    fetchSingleProfile
};