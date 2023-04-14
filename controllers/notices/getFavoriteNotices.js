const { array } = require("joi");
const { Notice } = require("../../models");
const { getAllNotices } = require('./getAllNotices');

const getFavoriteNotices = async (req, res) => {
    const { _id } = req.user;
    // const allNotices = await getAllNotices();
    // console.log(userId)
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    console.log(_id)
    console.log(await Notice.find({ favorite: _id }))
    
    // const favoriteNotices = await Notice
    //     .find({ favorite })

    const favoriteNotices = await Notice
        .find({ favorite: _id }, "", { skip, limit: Number(limit) })
        .populate("owner", "_id category title name birthdate breed sex location comments price");
    console.log('Hello')
    
    res.status(200).json(
        favoriteNotices,
    );
};

module.exports = getFavoriteNotices;