const { Pet } = require("../../models");
const { cloudinaryImgUpload } = require("../../helpers");

const addPet = async (req, res) => {
  const {
    body,
    file,
    user: { _id },
  } = req;

  if (file) {
    const { avatarURL } = await cloudinaryImgUpload(req);
    body.photo = avatarURL;
  }

  const result = await Pet.create({ ...body, owner: _id });
  res.status(201).json({
    message: "Upload completed successfully",
    dataPet: { ...result },
  });
};

module.exports = addPet;
