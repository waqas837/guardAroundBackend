const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
// const fileUpload = require("express-fileupload")
const mongoSanitizeSecurity = require("express-mongo-sanitize");
const xsscleanSecurity = require("xss-clean");
const hppSecurity = require("hpp");
// const ratelimit = require("express-rate-limit");
const appError = require("../Utils/appErrors");
const userRoutes = require("../Routes/UserRoutes");
const AdminRoutesForUserList = require("../Routes/AdminRoutesForUserList");
const AdminRoutesForIncidents = require("../Routes/AdminRoutesForIncidents");
//related to the like database is down/any other problem
// process.on("uncaughtException", (err) => {
//   console.log(`server is shutting down...`);
//   console.log(`${err.name} message:${err.message}`);
//   app.close(()=>{
//   process.exit(1)  //1. means with failure,this error exisis may be..like varialbes
//   })
// });

// const storyRouter = require('../Routes/storyRoutes');
const app = express();
// app.use(fileUpload());
app.use(helmet()); //headers protection
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(mongoSanitizeSecurity()); //noSql query injection protection
app.use(xsscleanSecurity()); //html symblos blocked
// app.use(hppSecurity()); //blocked paramter pollution
app.use("/public//images//", express.static(path.join("public/images/")));
app.use("/public/images/", express.static(path.join("public/images/")));
app.use("/public\\images\\", express.static(path.join("public/images/")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("welcome to GuardAround Backend");
});
// const ApiRateLimit = ratelimit({
//   max: 1,
//   // javascript works in the milisecond for the time
//   windowMs: 60 * 24 * 60 * 1000, //time to take a rest
//   message: "Api Request Rate limit exceeded,Try again in an hour",
// });
app.use("/api/user", userRoutes);
app.use("/api/adminUserApi", AdminRoutesForUserList);
app.use("/api/adminIncidentApi", AdminRoutesForIncidents);
//except the above routes,let's caught it
app.all("*", (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on server`, 404));
});
//send real error message to the by this middleware
// app.use(globalErrorHandleRoutes);
// console.log(x); check me for unhandled Exception
module.exports = app;
