const { News } = require("../../models/new");
const { BadRequest } = require("http-errors");

const getAllNews = async (req, res) => {
  const { lang = "ua", key = "" } = req.query;

  const allowedLanguages = ["ua", "en"];

  if (!allowedLanguages.includes(lang)) {
    throw BadRequest(
      "Choose another type of language. Availablel options: ua, en."
    );
  }

  const newsFilter = {
    [`title.${lang}`]: { $exists: true },
  };

  if (key) {
    newsFilter.$or = [
      { [`title.${lang}`]: { $regex: key, $options: "i" } },
      { [`description.${lang}`]: { $regex: key, $options: "i" } },
    ];
  }

  const news = await News.find(newsFilter, {
    [`title.${lang}`]: 1,
    [`description.${lang}`]: 1,
    link: 1,
    img: 1,
    date: 1,
    _id: 1,
  });

  res.json({
    message: "Successfully",
    news,
  });
};

module.exports = getAllNews;
