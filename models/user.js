const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { validationError } = require("../helpers");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    birthday: {
      type: Date,
      min: "1900-01-01",
      max: "2023-05-01",
    },
    avatarURL: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.post("save", validationError);
userSchema.post("findOneAndUpdate", validationError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  city: Joi.string().required(),
  phone: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginWhithTokenSchema = Joi.object({
  token: Joi.string().required(),
});

const User = model("user", userSchema);

const schemas = {
  registerSchema,
  loginSchema,
  loginWhithTokenSchema,
};

module.exports = { schemas, User };
