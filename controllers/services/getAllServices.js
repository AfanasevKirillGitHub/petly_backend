const { Service } = require("../../models/service");
const { BadRequest } = require("http-errors");

const getAllServices = async (req, res) => {
  // const { lang = "ua", page = 1, limit = 12 } = req.query;

  // const allowedLanguages = ["ua", "en"];

  // if (!allowedLanguages.includes(lang)) {
  //   throw BadRequest(
  //     "Choose another type of language. Availablel options: ua, en."
  //   );
  // }

  // const skip = (page - 1) * limit;

  // const services = await Service.find(
  //   { [`title.${lang}`]: { $exists: true } },
  //   {
  //     [`title.${lang}`]: 1,
  //     time: 1,
  //     [`address.${lang}`]: 1,
  //     addressUrl: 1,
  //     imageUrl: 1,
  //     workDays: 1,
  //     url: 1,
  //     email: 1,
  //     phone: 1,
  //     _id: 1,
  //   },
  //   { skip, limit: +limit }
  // );

  // if (!services.length) {
  //   throw BadRequest(
  //     "Choose another type of language. Availablel options: ua, en."
  //   );
  // }

  const services = await Service.find({});

  res.json({
    message: "Successfully",
    services,
  });
};

module.exports = getAllServices;
