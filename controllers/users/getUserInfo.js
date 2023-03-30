const getUserInfo = async (req, res) => {
  const { avatarURL, name, email, birthday, phone, city } = req.user;

  res.status(200).json({
    stauts: "success",
    code: 200,
    data: {
      user: {
        avatarURL,
        name,
        email,
        birthday,
        phone,
        city,
      },
    },
  });
};

module.exports = getUserInfo;
