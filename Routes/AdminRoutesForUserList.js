const express = require("express");
const router = express.Router();
const AdminUserController = require("../Controller/AdminUserController");
const Auth = require("../Middleware/Auth");
const imageUpload = require("../Middleware/imgUpload");

// Welcome message For Admin
router.get("/", (req, res) => {
  res.send("Welcome Admin");
});
//1.First admin login himself
router.route("/AdminLogin").post(AdminUserController.AdminLogin);

//2.These routes for the admin for take actions for users only
router.route("/FetchAllUsers").get(Auth, AdminUserController.FetchAllUsers);
router
  .route("/DeletSingleUser/:_id")
  .delete(Auth, AdminUserController.DeletSingleUser);
router.route("/UpdateUser/:_id").patch(Auth, AdminUserController.UpdateUser);
// 3.dummy data exported to the User List
router.route("/addNewUser").post(Auth, AdminUserController.addNewUser);
// 4.get dummy data
router.route("/getdummydata").get(Auth, AdminUserController.getdummydata);

// 5.imageUploadForUsers
router
  .route("/imageUploadForUsers/:_id")
  .patch(
    Auth,
    imageUpload.single("image"),
    AdminUserController.imageUploadForUsers
  );
//6. UpdateUserImageOnly
router
  .route("/UpdateUserImageOnly/:_id")
  .patch(
    Auth,
    imageUpload.single("image"),
    AdminUserController.UpdateUserImageOnly
  );
module.exports = router;
