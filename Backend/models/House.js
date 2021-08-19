const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = mongoose.Schema(
  {
    writer: {
      /*type: Schema.Types.ObjectId,
    ref: "User",*/
      type: String,
      maxlength: 50,
    },
    addr: {
      type: String,
      maxlength: 200,
    },
    images: [String],
    stabilityStar: {
      type: Number,
      default: 0,
    },
    stabilityDesc: {
      type: String,
    },
    accessStar: {
      type: Number,
      default: 0,
    },
    accessDesc: {
      type: String,
    },
  },
  { timestamps: true }
);

const House = mongoose.model("House", houseSchema);

module.exports = { House };
