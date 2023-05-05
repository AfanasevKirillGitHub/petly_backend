const { Notice } = require("../../models");
const { HttpError } = require("../../helpers");

const getNoticeById = async (req, res) => {
  const { id } = req.params;

  const noticesFilter = {
    _id: id,
  };

  const fullNotice = await Notice.findById(noticesFilter, {
    title: 1,
    breed: 1,
    comments: 1,
    avatarURL: 1,
    category: 1,
    birthdate: 1,
    sex: 1,
    name: 1,
    price: 1,
    favorite: 1,
    _id: 1,
    owner: 1,
    location: 1,
  }).populate("owner", " email phone");
  console.log(fullNotice);
  if (!fullNotice) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    message: "Successfully",
    fullNotice,
  });
};

// const getNoticeById = async (req, res) => {
//   const { id } = req.params;
//   const { lang = "ua" } = req.query;

//   const allowedLanguages = ["ua", "en"];

//   if (!allowedLanguages.includes(lang)) {
//     throw BadRequest(
//       "Choose another type of language. Availablel options: ua, en."
//     );
//   }

//   const noticesFilter = {
//     _id: id,
//   };

//   const fullNotice = await Notice.findById(noticesFilter, {
//     [`title.${lang}`]: 1,
//     [`breed.${lang}`]: 1,
//     [`comments.${lang}`]: 1,
//     avatarURL: 1,
//     category: 1,
//     birthdate: 1,
//     sex: 1,
//     name: 1,
//     price: 1,
//     favorite: 1,
//     _id: 1,
//     owner: 1,
//     [`location.city.${lang}`]: 1,
//   }).populate("owner", " email phone");
//   console.log(fullNotice);
//   if (!fullNotice) {
//     throw HttpError(404, "Not found");
//   }

//   res.status(200).json({
//     message: "Successfully",
//     fullNotice,
//   });
// };

module.exports = getNoticeById;
