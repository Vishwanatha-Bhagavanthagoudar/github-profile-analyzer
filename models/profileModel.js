const db = require("../config/db");

// Insert or update profile
const insertProfile = async (profile) => {

    const sql = `
    INSERT INTO profiles
    (
        username,
        name,
        bio,
        avatar_url,
        public_repos,
        followers,
        following,
        company,
        location,
        blog,
        twitter_username,
        github_created_at,
        account_age,
        score
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

    ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        bio = VALUES(bio),
        avatar_url = VALUES(avatar_url),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        company = VALUES(company),
        location = VALUES(location),
        blog = VALUES(blog),
        twitter_username = VALUES(twitter_username),
        github_created_at = VALUES(github_created_at),
        account_age = VALUES(account_age),
        score = VALUES(score)
    `;

    await db.execute(sql, profile);
};

// Get all profiles
const getAllProfiles = async () => {

    const [rows] = await db.execute(`
        SELECT *
        FROM profiles
        ORDER BY analyzed_at DESC
    `);

    return rows;
};

// Get profile by username
const getProfileByUsername = async (username) => {

    const [rows] = await db.execute(
        `
        SELECT *
        FROM profiles
        WHERE username = ?
        `,
        [username]
    );

    return rows;
};

module.exports = {
    insertProfile,
    getAllProfiles,
    getProfileByUsername
};