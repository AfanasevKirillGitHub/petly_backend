const { News } = require("../../models/new");
const { BadRequest } = require("http-errors");

const getAllNews = async (req, res) => {
  const { lang = "ua" } = req.query;

  const news = await News.find(
    { [`title.${lang}`]: { $exists: true } },
    "-createdAt -updatedAt"
  );

  if (!news) {
    throw BadRequest(
      "Choose another type of language. Availablel options: ua, us."
    );
  }

  res.json({
    message: "Successfully",
    news,
  });
};

module.exports = getAllNews;
