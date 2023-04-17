const { Notice } = require("../../models");
const { HttpError } = require("../../helpers");

const removeFavoriteNoticeById = async (req, res) => {
    const { _id: userId } = req.user;
    const { noticeId } = req.params;
    const removedNotice = await Notice
        .findOne({ _id: noticeId, favorite: userId });
    
    if (!removedNotice) {
        throw HttpError(404, "Notice is not found in favorite");
    }
    
    const { favorite } = removedNotice;
    const indexOfRemovedNotice = favorite.indexOf(userId);
    favorite.splice(indexOfRemovedNotice, 1);

    await Notice
        .findOneAndUpdate(
            { _id: noticeId },
            { favorite }
        );

    res.status(200).json({
        message: "Notice was removed from favorite",
    })
};

module.exports = removeFavoriteNoticeById;