const express = require("express");
const router = express.Router();

const { petJoiSchema } = require("../../models/pet");
const { auth, validation, ctrlWrapper, isValidPetsId } = require("../../middlewares");
const { pets: ctrl } = require("../../controllers");

router.get('/', auth, ctrlWrapper(ctrl.getAllUserPets));

router.post("/", auth, validation(petJoiSchema), ctrlWrapper(ctrl.addPet));

router.delete('/:petsId', auth, isValidPetsId, ctrlWrapper(ctrl.removePet))

module.exports = router;
