const { User } = require("../../models/user");
const { NotFound } = require("http-errors");
const { cloudinaryImgUpload } = require("../../helpers");

const update = async (req, res) => {
  const { body, file, user } = req;

  if (file) {
    const { avatarURL } = await cloudinaryImgUpload(req);
    body.avatarURL = avatarURL;
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: body,
    },
    { new: true, runValidators: true }
  );

  if (updatedUser) {
    const { name, email, birthday, phone, city, avatarURL, token } =
      updatedUser;

    res.status(200).json({
      message: "Update completed successfully",
      dataUser: {
        name,
        email,
        birthday,
        phone,
        city,
        avatarURL,
        token,
      },
    });
  }
  throw new NotFound("Not found");
};

module.exports = update;
