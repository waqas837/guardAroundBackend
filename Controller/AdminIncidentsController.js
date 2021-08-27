const IncidentModel = require("../Model/IncidentModel");
const asyncCatch = require("../Utils/asyncCatch");
const fs = require("fs");

// 1.Adding incident
exports.AddIncidentByAdmin = asyncCatch(async (req, res) => {
  const incidentAdded = await IncidentModel.create({
    "location.type": "Point",
    "location.coordinates": [req.body.location.lng, req.body.location.lat],
    type: req.body.type,
    title: req.body.title,
    description: req.body.description,
    // user:
    // like:
    // comment:
    // status:
  });
  if (incidentAdded) {
    res.status(201).json({
      success: true,
      message: "Incident added successfully",
      data: incidentAdded,
    });
  } else {
    res.json({ failure: true, message: "Internel sever error" });
  }
  // console.log(incidentAdded);
});

// 2.Adding files for incidents
exports.AddingFilesForIncident = asyncCatch(async (req, res) => {
  const { _id } = req.params;
  const { path } = req.file;
  const { mimetype } = req.file;

  const filesAdded = await IncidentModel.findByIdAndUpdate(
    { _id },
    {
      $addToSet: { files: { path: path, type: mimetype } },
      thumbnail: path,
    },
    { new: true }
  );
  if (filesAdded) {
    res.json({
      success: true,
      message: "file uploaded succeed",
      data: filesAdded,
    });
  }
});

// 3.getAllDataOf IncidentsToAdmin
exports.getAllDataOfIncidentsToAdmin = asyncCatch(async (req, res) => {
  const getAllIncidents = await IncidentModel.find({});
  if (getAllIncidents) {
    res.status(200).json({
      success: true,
      message: "Data found succeed",
      data: getAllIncidents,
    });
  }
});

// 4. Delete an incident
exports.deleteIncident = asyncCatch(async (req, res) => {
  const { _id } = req.params;
  const filesPath = await IncidentModel.findById({ _id }).select("files.path");
  // console.log(filesPath.files);
  const myFiles = filesPath.files.map((val) => val.path);

  function deleteFiles(files) {
    files.forEach((path) =>
      fs.unlink(path, (err) => {
        console.log(err);
      })
    );
  }
  deleteFiles(myFiles);

  const dataDeleted = await IncidentModel.findByIdAndDelete({ _id });
  if (dataDeleted) {
    res.json({ success: true, message: "data deleted" });
  }
});

// 5. getSpecificPostFiles
exports.getSpecificPostFiles = asyncCatch(async (req, res) => {
  const { _id } = req.params;
  const myFiles = await IncidentModel.findById({ _id }).select("files");

  if (myFiles) {
    res.json({ success: true, data: myFiles });
  }
});

// 6. select A status Of Post
exports.selectAstatusOfPost = asyncCatch(async (req, res) => {
  const { _id } = req.params;
  // console.log(req.body)
  const statussett = await IncidentModel.findByIdAndUpdate({ _id }, req.body, {
    new: true,
  });
  if (statussett) {
    res.status(201).json({ success: true, status: statussett });
  }
});
