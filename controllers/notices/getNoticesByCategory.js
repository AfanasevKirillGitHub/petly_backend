const { Notice } = require("../../models");
const { BadRequest } = require("http-errors");

const getNoticesByCategory = async (req, res, next) => {
  const { category } = req.params;

  if (category === "favorite" || category === "own") {
    return next();
  }

  const { page = 1, limit = 12, key = "" } = req.query;

  const noticesFilter = {
    ["category"]: { $regex: category },
  };

  if (key) {
    noticesFilter.$or = [
      {
        ["category"]: { $regex: category },
      },
    ];
  }

  const skip = (page - 1) * limit;
  const notices = await Notice.find(
    noticesFilter,

    {
      _id: 1,
      category: 1,
      title: 1,
      name: 1,
      birthdate: 1,
      breed: 1,
      sex: 1,
      avatarURL: 1,
      location: 1,
      comments: 1,
      price: 1,
      favorite: 1,
    },
    { skip, limit: +limit }
  ).populate("owner", "_id");

  res
    .status(200)
    .json({ message: "Successfully", notices, total: notices.length });
};

// const getNoticesByCategory = async (req, res, next) => {
//   const { category } = req.params;

//   if (category === "favorite" || category === "own") {
//     return next();
//   }

//   const { lang = "ua", page = 1, limit = 12, key = "" } = req.query;

//   // ------- Пренести в константи
//   const languages = {
//     UA: "ua",
//     EN: "en",
//   };

//   const allowedLanguages = Object.values(languages);
//   const stringifiedAllowedLanguages = allowedLanguages.join(", ");
//   // ------- Пренести в константи

//   if (!allowedLanguages.includes(lang)) {
//     throw BadRequest(
//       `Choose another type of language. Аvailable options: ${stringifiedAllowedLanguages}.`
//     );
//   }

//   const noticesFilter = {
//     [`title.${lang}`]: { $exists: true },
//     ["category"]: { $regex: category },
//   };

//   if (key) {
//     noticesFilter.$or = [
//       {
//         [`title.${lang}`]: { $regex: key, $options: "i" },
//         ["category"]: { $regex: category },
//       },
//     ];
//   }

//   const skip = (page - 1) * limit;
//   const notices = await Notice.find(
//     noticesFilter,

//     {
//       _id: 1,
//       category: 1,
//       [`title.${lang}`]: 1,
//       name: 1,
//       birthdate: 1,
//       [`breed.${lang}`]: 1,
//       sex: 1,
//       avatarURL: 1,
//       location: { [`city.${lang}`]: 1, [`region.${lang}`]: 1 },
//       [`comments.${lang}`]: 1,
//       price: 1,
//       favorite: 1,
//     },
//     { skip, limit: +limit }
//   ).populate("owner", "_id");

//   res
//     .status(200)
//     .json({ message: "Successfully", notices, total: notices.length });
// };

module.exports = getNoticesByCategory;
