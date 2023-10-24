const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema(
  {
    wardNumber: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    specialization: {
      type: String,
      enum: [
        "Cardiology",
        "Oncology",
        "Neurology",
        "Orthopedic",
        "Pediatric",
        "Burn Unit",
        "ENT",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ward = mongoose.model("Ward", wardSchema);

module.exports = Ward;
