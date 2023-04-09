const { Notice } = require("../../models");

const getFavoriteNotices = async (req, res) => {
    const {_id} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    const favoriteNotices = await Notice
        .find({ owner: _id, favorite }, "", { skip, limit: Number(limit) })
        .populate("owner", "_id category title name birthdate breed sex location comments price");
    
    res.status(200).json(
        favoriteNotices,
    );
};

module.exports = getFavoriteNotices;