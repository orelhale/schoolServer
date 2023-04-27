let systemRoute = require("../../routes/systemRoute")
let adminRoute = require("../../routes/adminRoute")
let usersRoute = require("../../routes/usersRoute")


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

   app.use("*", (req, res) => {
      res.status(404).send("The page not found")
   })
}

module.exports = mainRoute