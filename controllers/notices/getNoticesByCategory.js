const { Notice } = require("../../models");
const { BadRequest } = require("http-errors");

const getAllNotices = async (req, res) => {
  const category = req.params;

  const { lang = "ua", page = 1, limit = 12 } = req.query;

  // ------- Пренести в константи
  const languages = {
    UA: "ua",
    EN: "en",
  };

  const allowedLanguages = Object.values(languages);
  const stringifiedAllowedLanguages = allowedLanguages.join(", ");
  // ------- Пренести в константи

  if (!allowedLanguages.includes(lang)) {
    throw BadRequest(
      `Choose another type of language. Аvailable options: ${stringifiedAllowedLanguages}.`
    );
  }

  const skip = (page - 1) * limit;

  const notices = await Notice.find(
    category,
    {
      _id: 1,
      category: 1,
      [`title.${lang}`]: 1,
      name: 1,
      birthdate: 1,
      [`breed.${lang}`]: 1,
      sex: 1,
      location: { [`city.${lang}`]: 1, [`region.${lang}`]: 1 },
      [`comments.${lang}`]: 1,
      price: 1,
      favorite: 1,
    },
    { skip, limit: +limit }
  );

  res
    .status(200)
    .json({ message: "Successfully", notices, total: notices.length });
};

module.exports = getAllNotices;