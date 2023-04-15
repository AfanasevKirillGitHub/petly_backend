const { Schema, model } = require("mongoose");
const { validationError } = require("../helpers");

const serviceSchema = new Schema(
  {
    title: {
      en: {
        type: String,
        required: [true, "Name is required"],
        description: "Name of service",
      },
      ua: {
        type: String,
        required: [true, "Name is required"],
        description: "Name of service",
      },
    },
    address: {
      en: {
        type: String,
        default: null,
        description: "Address of service",
      },
      ua: {
        type: String,
        default: null,
        description: "Address of service",
      },
    },
    addressUrl: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    workDays: [
      {
        isOpen: { type: Boolean },
        from: { type: String },
        to: { type: String },
      },
    ],
    url: {
      type: String,
      required: [true, "Address is required"],
      description: "UrlAddress of service",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      description: "Email of service",
    },
    phone: {
      type: String,
      default: null,
      description: "Phone of service",
    },
  },
  { versionKey: false, timestamps: true }
);

serviceSchema.post("save", validationError);

const Service = model("service", serviceSchema);

module.exports = { Service };
