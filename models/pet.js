const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { validationError } = require("../helpers");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    birthday: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
    },
    photo: {
      type: String,
    //   required: [true, "Photo is required"],
    default: null,
    },
    comments: {
      type: String,
      minlength: 8,
      maxlength: 120,
      default: null,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
  },
  { versionKey: false, timestamps: true }
);

const petJoiSchema = Joi.object({
    name: Joi.string().required(),
    birthday: Joi.string().required(),
    breed: Joi.string().required(),
    photo: Joi.string(),
    comments: Joi.string()
});


const Pet = model("pet", petSchema);


module.exports = { 
    Pet,
    petJoiSchema 
};