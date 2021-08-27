const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const files = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["vedio", "image"],
    default: "image",
  },
  path: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: "",
  },
});
const incidents = new Schema(
  {
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    //   index: true,
    //   required: true,
    // },
    // like: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "likes",
    //   index: true,
    // },
    // comment: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "comments",
    //   index: true,
    // },
    type: {
      type: String,
      enum: [
        "Safety",
        "Crime",
        "Neighborly Moment",
        "Missing person",
        "Suspicious Activity",
      ],
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
    files: [files],
    status: {
      type: String,
      enum: ["unvarified", "verified", "deleted"],
      default: "unvarified",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
incidents.index({ location: "2dsphere" });


// mongoose middleware are called automatically pre/post/and anyother...
// var autoPopulateLead = function (next) {
//   this.populate({ path: "like" });
//   this.populate({ path: "comment", select: { count: 1, _id: 1, incident: 1 } });
//   next();
// };

// incidents
//   .pre("findOne", autoPopulateLead)
//   .pre("find", autoPopulateLead)
//   .pre("findById", autoPopulateLead);
module.exports = mongoose.model("incidents", incidents);
