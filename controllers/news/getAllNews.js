const { News } = require("../../models/new");
const { BadRequest } = require("http-errors");

const getAllNews = async (req, res) => {
  const { lang = "ua" } = req.query;

  const allowedLanguages = ["ua", "en"];

  if (!allowedLanguages.includes(lang)) {
    throw BadRequest(
      "Choose another type of language. Availablel options: ua, en."
    );
  }

  const news = await News.find(
    {
      [`title.${lang}`]: { $exists: true },
    },

    {
      [`title.${lang}`]: 1,
      [`description.${lang}`]: 1,
      link: 1,
      date: 1,
      _id: 0,
    }
  );

  res.json({
    message: "Successfully",
    news,
  });
};

module.exports = getAllNews;
