let express = require("express")
let mongoose = require("mongoose")
require('dotenv').config()
let cors = require("cors")
let mainRoute = require("./routes/mainRoute")
let { 
    createDefaultUsers,
     createDefaultClass,
     createDefaultStudent,
     createDefaultProfession,
     createDefaultExams,
     } = require("./functions/system_function")

require("./DB/connectionToMongo")

let app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())

mainRoute(app)

app.get("/", (req, res) => {
    res.status(200).send("welcome")
})

let port = process.env.MYPORT || 4001
app.listen(port, () => {
    createDefaultStudent()
    createDefaultUsers()
    createDefaultClass()
    createDefaultProfession()
    createDefaultExams()
    console.log("server work in port = " + port)
})

