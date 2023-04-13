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
      en: {
        type: String,
        min: 2,
        max: 48,
        match: /[a-zA-Z]/,
        required: [true, "Title is required"],
        description: "Notice title in en",
      },
      ua: {
        type: String,
        min: 2,
        max: 48,
        match: /[а-яА-Я]/,
        required: [true, "Title is required"],
        description: "Notice title in ua",
      },
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
      en: {
        type: String,
        min: 2,
        max: 24,
        match: /[a-zA-Z]/,
        required: [true, "Breed is required"],
        description: "Notice breed in en",
      },
      ua: {
        type: String,
        min: 2,
        max: 24,
        match: /[а-яА-Я]/,
        required: [true, "Breed is required"],
        description: "Notice breed in ua",
      },
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Sex is required"],
    },
    location: {
      type: Object,
      city: {
        en: {
          type: String,
          min: 2,
          max: 36,
          match: /[a-zA-Z]/,
          description: "Notice city in en",
        },
        ua: {
          type: String,
          min: 2,
          max: 36,
          match: /[а-яА-Я]/,
          description: "Notice city in ua",
        },
      },
      region: {
        en: {
          type: String,
          min: 2,
          max: 48,
          match: /[a-zA-Z]/,
          description: "Notice region in en",
        },
        ua: {
          type: String,
          min: 2,
          max: 48,
          match: /[а-яА-Я]/,
          description: "Notice region in ua",
        },
      },
    },
    comments: {
      en: {
        type: String,
        min: 8,
        max: 120,
        description: "Notice comments in en",
      },
      ua: {
        type: String,
        min: 8,
        max: 120,
        description: "Notice comments in ua",
      },
    },
    price: {
      type: Number,
      default: 0,
      description: "Notice price",
    },
    favorite: {
      type: Boolean,
      default: false,
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
  title: Joi.object({
    en: Joi.string()
      .min(2)
      .max(48)
      .pattern(/[a-zA-Z]/)
      .required(),
    ua: Joi.string()
      .min(2)
      .max(48)
      .pattern(/[а-яА-Я]/)
      .required(),
  }),
  name: Joi.string()
    .min(2)
    .max(16)
    .pattern(/[a-zA-Zа-яА-Я]/)
    .required(),
  birthdate: Joi.date(),
  breed: Joi.object({
    en: Joi.string()
      .min(2)
      .max(24)
      .pattern(/[a-zA-Z]/)
      .required(),
    ua: Joi.string()
      .min(2)
      .max(24)
      .pattern(/[а-яА-Я]/)
      .required(),
  }),
  sex: Joi.string().valid("male", "female").required(),
  location: Joi.object({
    city: Joi.object({
      en: Joi.string()
        .min(2)
        .max(36)
        .pattern(/[a-zA-Z]/)
        .required(),
      ua: Joi.string()
        .min(2)
        .max(36)
        .pattern(/[а-яА-Я]/)
        .required(),
    }),
    region: Joi.object({
      en: Joi.string()
        .min(2)
        .max(48)
        .pattern(/[a-zA-Z]/)
        .required(),
      ua: Joi.string()
        .min(2)
        .max(48)
        .pattern(/[а-яА-Я]/)
        .required(),
    }),
  }),
  comments: Joi.object({
    en: Joi.string()
      .min(8)
      .max(120)
      .pattern(/[a-zA-Z]/)
      .required(),
    ua: Joi.string()
      .min(8)
      .max(120)
      .pattern(/[а-яА-Я]/)
      .required(),
  }),
  price: Joi.number().default(0),
  favorite: Joi.boolean().default(false),
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
