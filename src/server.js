const app = require("./app");
const mongoose = require("mongoose");
//many credentials for the starting our app process,,
//then we can access to env varialbes, then . port
// console.log(process.env);
var Port = process.env.PORT || 1000;
app.listen(Port, () => {
  console.log(`server is listening at port ${Port}`);
});
//database connection
mongoose
  .connect("mongodb://localhost/guaurdaround", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`DB connection failed ${err}`));
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);

//1.unhandeled promise rejection errors(async errors)
//these errors are not the related to our app but these are
//related to the like database is down/any other problem
// process.on("unhandledRejection", (err) => {
//   console.log(`server is shutting down...`);
//   console.log(`${err.name} message:${err.message}`);
//   app.close(()=>{
//   process.exit(1)  //1. means with failure of reject promises/any other services
//   //that used in app but related to third party services ..that's it
//   })
// });
