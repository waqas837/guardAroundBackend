const UserModel = require("../Model/UserModel");
const AdminModel = require("../Model/AdminModel");
const asyncCatch = require("../Utils/asyncCatch");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");

//* This file consists all About the Admin and its related actions *//

// generate a token function
const genToken = (id) => {
  const token = jwt.sign({ id }, "thisissecretkey");
  return token;
};
// 1.Admin Login Himself
exports.AdminLogin = asyncCatch(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await AdminModel.findOne({ email });
  if (!findAdmin) {
    {
      res.json({ invalidUser: "Invalid email or passowrd" });
    }
  } else if (findAdmin) {
    const hashedPassword = await bcrypt.compare(password, findAdmin.password);
    if (!hashedPassword) {
      res.json({ invalidUser: "Invalid email or passowrd" });
    } else if (findAdmin && hashedPassword) {
      const token = genToken(findAdmin._id);
      res.cookie("admin", token);
      res.status(200).json({
        success: true,
        message: "successfully logged in",
        userDetails: findAdmin,
      });
    }
  }
});

//1.Fetch all the users
exports.FetchAllUsers = asyncCatch(async (req, res) => {
  const allUsers = await UserModel.find();
  let lengthUsers = allUsers.length;
  if (allUsers) {
    res.status(200).json({ Records: lengthUsers, users: allUsers });
  }
});

//2.Delete single user
exports.DeletSingleUser = asyncCatch(async (req, res) => {
  const { _id } = req.params;
  // first we find the path of image
  const imagePath = await UserModel.findById({ _id }).select("image");
  // console.log(imagePath.image);
  fs.unlink(imagePath.image, (err) => {
    console.log(err);
  });
  const userDeleted = await UserModel.findByIdAndDelete({ _id });
  if (userDeleted) {
    res
      .status(200)
      .json({ success: true, messege: "Record deleted successfully" });
  }
});

//3.Update single user
exports.UpdateUser = asyncCatch(async (req, res) => {
  const { _id } = req.params;
  // const { username, email, password } = req.body;
  // const hashedPassword = await bcrypt.hash(password, 10);
  // we can change any value coming from front-end by insert value in its object
  // req.body.password = hashedPassword;
  const userUpdated = await UserModel.findByIdAndUpdate({ _id }, req.body, {
    new: true,
  });
  if (userUpdated) {
    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  }
});

// 4.add a new User by admin
exports.addNewUser = asyncCatch(async (req, res) => {
  const data = await UserModel.create({
    phone: req.body.phone,
    username: req.body.username,
    address: req.body.address,
    code: req.body.code,
    number: req.body.number,
    firstname: req.body.firstname,
    country: req.body.country,
    city: req.body.city,
    "location.type": "Point",
    "location.coordinates": [req.body.location.lng, req.body.location.lat],
    lastname: req.body.lastname,
    email: req.body.email,
    about: req.body.about,
    incidents: req.body.incidents,
    // status: "deleted",
    type: "admin", //becuase this route is specified for admin
  });
  if (data) {
    res.json({ success: true, message: "data added successfully", data });
  }
});
// get dummy data//this data is real now
exports.getdummydata = asyncCatch(async (req, res) => {
  const getUsers = await UserModel.find();
  res.json({ success: true, getUsers });
});

// imageUploadForUsers
exports.imageUploadForUsers = asyncCatch(async (req, res) => {
  const { _id } = req.params;
  const { path } = req.file;
  const getData = await UserModel.findByIdAndUpdate({ _id }, { image: path });
  if (getData) {
    res.json({ success: true, message: "image upload successfully" });
  }
});

// UpdateUserImageOnly;

exports.UpdateUserImageOnly = asyncCatch(async (req, res) => {
  const { _id } = req.params;
  const { path } = req.file;

  // first we will delete old image
  const imagePath = await UserModel.findById({ _id }).select("image");
  // console.log(imagePath.image);
  fs.unlink(imagePath.image, (err) => {
    console.log(err);
  });
  // then update a new one
  const getData = await UserModel.findByIdAndUpdate({ _id }, { image: path });
  if (getData) {
    res.json({ success: true, message: "image updated successfully" });
  }
});
