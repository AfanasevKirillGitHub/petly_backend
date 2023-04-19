const getUserInfo = async (req, res) => {
  const { avatarURL, name, email, birthday, phone, city } = req.user;

  res.status(200).json({
    status: "success",
    dataUser: {
      avatarURL,
      name,
      email,
      birthday,
      phone,
      city,
    },
  });
};

module.exports = getUserInfo;
