const { Schema, model } = require("mongoose");
const { validationError } = require("../helpers");

const serviceSchema = new Schema(
  {
    name: {
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
    time: {
      type: Date,
      required: [true, "Time is required"],
      description: "Schedule",
    },
    address: {
      en: {
        type: String,
        required: [true, "Address is required"],
        description: "Address of service",
      },
      ua: {
        type: String,
        required: [true, "Address is required"],
        description: "Address of service",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      description: "Email of service",
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      description: "Phone of service",
    },
  },
  { versionKey: false, timestamps: true }
);

serviceSchema.post("save", validationError);

const Service = model("service", serviceSchema);

module.exports = { Service };
