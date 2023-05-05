const { Notice } = require("../../models");

const getFavoriteNotices = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, key = "" } = req.query;
  const skip = (page - 1) * limit;

  const noticesFilter = {
    [`favorite`]: _id,
  };

  if (key) {
    noticesFilter.$or = [
      {
        ["favorite"]: _id,
      },
    ];
  }

  const favoriteNotices = await Notice.find(noticesFilter, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  res.status(200).json({
    message: "Successfully",
    favoriteNotices,
    total: favoriteNotices.length,
  });
};

// const getFavoriteNotices = async (req, res) => {
//   const { _id } = req.user;
//   const { page = 1, limit = 20, key = "", lang = "en" } = req.query;
//   const skip = (page - 1) * limit;

//   const noticesFilter = {
//     [`title.${lang}`]: { $exists: true },
//     [`favorite`]: _id,
//   };

//   if (key) {
//     noticesFilter.$or = [
//       {
//         [`title.${lang}`]: { $regex: key, $options: "i" },
//         ["favorite"]: _id,
//       },
//     ];
//   }

//   const favoriteNotices = await Notice.find(noticesFilter, "", {
//     skip,
//     limit: Number(limit),
//   }).populate("owner", "_id name email");

//   res.status(200).json({
//     message: "Successfully",
//     favoriteNotices,
//     total: favoriteNotices.length,
//   });
// };

module.exports = getFavoriteNotices;
