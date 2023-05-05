const { Notice } = require("../../models/notice");
const { cloudinaryImgUpload } = require("../../helpers");

const addNotice = async (req, res) => {
  let noticeAvatarURL = null;
  let noticeCloudAvatar = null;

  if (req.file) {
    const { avatarURL, idCloudAvatar } = await cloudinaryImgUpload(req);
    noticeAvatarURL = avatarURL;
    noticeCloudAvatar = idCloudAvatar;
  }

  const { _id: owner } = req.user;

  // console.log(req.body);

  const notice = new Notice({
    ...req.body,
    price: Number(req.body.price),
    avatarURL: noticeAvatarURL,
    idCloudAvatar: noticeCloudAvatar,
    owner,
  });

  await notice.save();

  res.status(200).json({ notice });
};

module.exports = addNotice;
