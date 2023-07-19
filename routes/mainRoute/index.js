let systemRoute = require("../../routes/systemRoute")
let adminRoute = require("../../routes/adminRoute")
let usersRoute = require("../../routes/usersRoute")
let examsRoute = require("../../routes/examsRoute")
let professionRoute = require("../../routes/professionRoute")
let dailydatasRoute = require("../../routes/dailydatasRoute")
let studentsRoute = require("../../routes/studentsRoute")
let classesRoute = require("../../routes/classesRoute")
let emailRoute = require("../../routes/emailRoute")


function mainRoute(app) {

   app.use((req, res, next) => {
      console.log("Path = ", req.url);
      console.log("Body = ", req.body);
      console.log("\n");
      next()
   })

   app.use("/system", systemRoute)
   app.use("/admin", adminRoute)
   app.use("/users", usersRoute)
   app.use("/exams", examsRoute)
   app.use("/professions", professionRoute)
   app.use("/dailydatas", dailydatasRoute)
   app.use("/students", studentsRoute)
   app.use("/classes", classesRoute)
   app.use("/email", emailRoute)

   app.use("*", (req, res) => {
      res.status(404).send("The page not found")
   })
}

module.exports = mainRoute