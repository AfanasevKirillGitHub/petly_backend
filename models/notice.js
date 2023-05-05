const { Schema, model } = require("mongoose");
const { validationError } = require("../helpers");
const Joi = require("joi");
const { BadRequest } = require("http-errors");

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lost-found", "for-free"],
      required: [true, "Category is required"],
      description: "Notice categories",
    },
    title: {
      type: String,
      min: 2,
      max: 48,
      match: /[a-zA-Zа-яА-Я]/,
      required: [true, "Title is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      min: 2,
      max: 16,
      match: /[a-zA-Zа-яА-Я]/,
      description: "Notice name in en",
    },
    birthdate: {
      type: Date,
      required: [true, "Birth date is required"],
      description: "Notice birth date",
    },
    breed: {
      type: String,
      min: 2,
      max: 24,
      match: /[a-zA-Zа-яА-Я]/,
      required: [true, "Breed is required"],
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Sex is required"],
    },
    location: { type: String, min: 2, max: 36, match: /[a-zA-Zа-яА-Я]/ },
    comments: { type: String, min: 8, max: 120 },
    price: {
      type: Number,
      default: 0,
      description: "Notice price",
    },
    favorite: [],
    avatarURL: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const noticeJoiSchema = Joi.object({
  category: Joi.string().valid("sell", "lost-found", "for-free").required(),
  title: Joi.string()
    .min(2)
    .max(48)
    .pattern(/[a-zA-Z]/)
    .required(),
  name: Joi.string()
    .min(2)
    .max(16)
    .pattern(/[a-zA-Zа-яА-Я]/)
    .required(),
  birthdate: Joi.string(),
  breed: Joi.string()
    .min(2)
    .max(24)
    .pattern(/[a-zA-Z]/)
    .required(),
  sex: Joi.string().valid("male", "female").required(),
  location: Joi.string()
    .min(2)
    .max(36)
    .pattern(/[a-zA-Z]/)
    .required(),
  comments: Joi.string()
    .min(8)
    .max(120)
    .pattern(/[a-zA-Z]/)
    .required(),
  price: Joi.number().default(0),
  favorite: Joi.array().items(Joi.string()).default(false),
  avatarURL: Joi.string(),
});

noticeSchema.pre("save", async function () {
  if (this.category === "sell" && this.price === 0) {
    throw BadRequest(
      "If you want to sell your pet - price must be higher then null"
    );
  }

  if (this.category === "for-free" && this.price > 0) {
    throw BadRequest("FOR-FREE can't have a price higher then null");
  }
});
noticeSchema.post("save", validationError);

const Notice = model("notice", noticeSchema);

module.exports = {
  Notice,
  noticeJoiSchema,
};
