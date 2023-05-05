const { Notice } = require("../../models");

const getOwnNotices = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 20, key = "" } = req.query;
  const skip = (page - 1) * limit;

  const noticesFilter = {
    [`owner`]: _id,
  };

  if (key) {
    noticesFilter.$or = [
      {
        [`owner`]: _id,
      },
    ];
  }

  const notices = await Notice.find(noticesFilter, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id");

  res.status(200).json({
    message: "Successfully",
    notices,
    total: notices.length,
  });
};

// const getOwnNotices = async (req, res) => {
//   const { _id } = req.user;

//   const { page = 1, limit = 20, key = "", lang = "en" } = req.query;
//   const skip = (page - 1) * limit;

//   const noticesFilter = {
//     [`title.${lang}`]: { $exists: true },
//     [`owner`]: _id,
//   };

//   if (key) {
//     noticesFilter.$or = [
//       {
//         [`title.${lang}`]: { $regex: key, $options: "i" },
//         [`owner`]: _id,
//       },
//     ];
//   }

//   const notices = await Notice.find(noticesFilter, "", {
//     skip,
//     limit: Number(limit),
//   }).populate("owner", "_id");

//   res.status(200).json({
//     message: "Successfully",
//     notices,
//     total: notices.length,
//   });
// };

module.exports = getOwnNotices;
