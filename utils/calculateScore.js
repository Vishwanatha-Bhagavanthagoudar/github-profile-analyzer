const calculateScore = (profile) => {

    return (
        profile.followers * 3 +
        profile.public_repos * 2 +
        profile.following
    );

};

module.exports = calculateScore;