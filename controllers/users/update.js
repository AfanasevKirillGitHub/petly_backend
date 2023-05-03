const { User } = require("../../models/user");

const update = async (req, res) => {
  const { _id } = req.user;
  const { body } = req;
  await User.findByIdAndUpdate(_id, body, {
    new: true,
    runValidators: true,
  });
  res.json({
    message: "Update completed successfully",
    user: {
      ...body,
      _id,
    },
  });
};

module.exports = update;
