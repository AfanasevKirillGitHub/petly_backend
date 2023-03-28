const { Pet } = require("../../models")
const HttpError = require("../../helpers");

const removePet = async (req, res) => {
    const {petsId} = req.params;
    const result = await Pet.findByIdAndRemove(petsId);
    if(!result){
        throw HttpError(404, "Not found");
    }
    res.status(200).json({
      message: "Pet deleted",
    })
};

module.exports = removePet;