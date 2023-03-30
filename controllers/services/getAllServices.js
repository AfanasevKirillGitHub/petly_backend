const { Service } = require("../../models/service");
const { BadRequest } = require("http-errors");

const getAllServices = async (req, res) => {
  const { lang = "ua" } = req.query;

  const services = await Service.find(
    { [`name.${lang}`]: { $exists: true } },
    "-createdAt -updatedAt"
  );

  if (!services) {
    throw BadRequest(
      "Choose another type of language. Availablel options: ua, us."
    );
  }

  res.json({
    message: "Successfully",
    services,
  });
};

module.exports = getAllServices;
