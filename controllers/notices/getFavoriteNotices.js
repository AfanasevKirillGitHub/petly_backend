const { Notice } = require("../../models");

const getFavoriteNotices = async (req, res) => {
    const { _id } = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;

    const favoriteNotices = await Notice
        .find({ favorite: _id }, "", { skip, limit: Number(limit) })
        .populate("owner", "_id name email");
    
    res.status(200).json({
        message: "Successfully",
        favoriteNotices,
        total: favoriteNotices.length
    });
};

module.exports = getFavoriteNotices;