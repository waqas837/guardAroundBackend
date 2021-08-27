const AdminIncidentsController = require("../Controller/AdminIncidentsController");
const Auth = require("../Middleware/Auth");
const FilesUpload = require("../Middleware/imgUpload");
const router = require("express").Router();

// 1.add an incident
router
  .route("/AddIncidentByAdmin")
  .post(Auth, AdminIncidentsController.AddIncidentByAdmin);

module.exports = router;
//2.Add files for the incident
router
  .route("/addFilesForIncidentByAdmin/:_id")
  .patch(
    Auth,
    FilesUpload.single("image"),
    AdminIncidentsController.AddingFilesForIncident
  );
// 3.Get All Data fo incidents
router
  .route("/getAllDataOfIncidentsToAdmin")
  .get(Auth, AdminIncidentsController.getAllDataOfIncidentsToAdmin);

// 4.Delete an Incident
router
  .route("/deleteIncident/:_id")
  .delete(Auth, AdminIncidentsController.deleteIncident);

// 5.
router
  .route("/getSpecificPostFiles/:_id")
  .get(Auth, AdminIncidentsController.getSpecificPostFiles);

// 6.select A status Of Post
router
  .route("/selectAstatusOfPost/:_id")
  .post(Auth, AdminIncidentsController.selectAstatusOfPost);
