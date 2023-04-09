const { Notice } = require("../../models");
const HttpError = require("../../helpers");

const removeFavoriteNotice = async (req, res) => {
    const {noticeId} = req.params;
    const result = await Notice.findByIdAndRemove(noticeId);
    
    if (!result) {
        throw HttpError(404, "Not found");
    }
        
    res.status(200).json({
        message: "Notice was removed from favorite category",
    })
};

module.exports = removeFavoriteNotice;