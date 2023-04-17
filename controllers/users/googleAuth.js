const googleAuth = async (req, res) => {
  const { _id: id } = req.user;

  const payload = {
    id: user._id,
  };

  const token = createToken(payload);
  await User.findByIdAndUpdate(id, { token });

  res.redirect(
    `https://afanasevkirillgithub.github.io/petly_frontend/?token=${token}`
  );
};

module.exports = googleAuth;
