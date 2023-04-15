const { Schema, model } = require("mongoose");
const { validationError } = require("../helpers");

const newsSchema = new Schema(
  {
    title: {
      en: {
        type: String,
        required: true,
        unique: true,
        description: "News title in English",
      },
      ua: {
        type: String,
        required: true,
        unique: true,
        description: "News title in Ukr",
      },
    },
    description: {
      en: {
        type: String,
        required: true,
        description: "News description in English",
      },
      ua: {
        type: String,
        required: true,
        description: "News description in Ukr",
      },
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true,
      description: "News creation date",
    },
    img: {
      type: String,
      required: true,
      description: "Img news",
    },
    link: {
      type: String,
      required: true,
      match:
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      description: "Link to full news",
    },
  },
  { versionKey: false, timestamps: true }
);

newsSchema.post("save", validationError);

const News = model("news", newsSchema);

module.exports = { News };
