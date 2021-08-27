const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema(
  {
    phone: {
      type: String,
      index: true,
      unique: true,
    },
    username: {
      type: String,
      index: true,
    },
    code: {
      type: String,
      index: true,
    },
    number: {
      type: String,
      index: true,
    },
    firstname: {
      type: String,
      index: true,
      default: "",
    },
    country: {
      type: String,
      index: true,
      default: "",
    },
    address: {
      type: String,
      index: true,
      default: "",
    },
    city: {
      type: String,
      index: true,
      default: "",
    },
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

    lastname: {
      type: String,
      index: true,
      default: "",
    },
    email: {
      type: String,
      index: true,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "placeholder.jpg",
    },
    incidents: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["deleted", "verified", "unverified"],
      default: "verified",
      index: true,
    },
    type: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
// below is called schema level creating indexes, it supports compound indexes/means create index more than one field,
// when executed, then indexes will created by createIndex automatic,
// syntax: schemeName.index({fieldName:1,or fieldName:-1}) //ascending or descending orders
// it is actually the ixscan, then we will query in this index keys,,

// users.index({ location: "2dsphere" });

module.exports = mongoose.model("User", users);
