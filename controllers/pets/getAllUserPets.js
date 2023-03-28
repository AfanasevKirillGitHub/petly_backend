const {Pet} = require("../../models")


const getAllUserPets = async (req, res) => {
    const {_id} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    const pets = await Pet.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id name email");
      res.status(200).json(
        pets,
      );
};

module.exports = getAllUserPets;