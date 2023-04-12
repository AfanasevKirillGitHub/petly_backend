const { Notice } = require("../../models");
//риба для додавання оголошень
const addNotice = async (req, res) => {
  const body = req.body;
  const { _id } = req.user;

  const notice = await Notice.create({ ...body, owner: _id });

  res.status(201).json({ message: notice });
};

module.exports = addNotice;
