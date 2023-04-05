const { Service } = require("../../models/service");
const { BadRequest } = require("http-errors");

const getAllServices = async (req, res) => {
  const { lang = "ua" } = req.query;

  const allowedLanguages = ["ua", "en"];

  if (!allowedLanguages.includes(lang)) {
    throw BadRequest(
      "Choose another type of language. Availablel options: ua, en."
    );
  }

  const services = await Service.find(
    { [`name.${lang}`]: { $exists: true } },
    {
      [`name.${lang}`]: 1,
      time: 1,
      [`address.${lang}`]: 1,
      email: 1,
      phone: 1,
      _id: 1,
    }
  );

  if (!services.length) {
    throw BadRequest(
      "Choose another type of language. Availablel options: ua, en."
    );
  }

  res.json({
    message: "Successfully",
    services,
  });
};

module.exports = getAllServices;
