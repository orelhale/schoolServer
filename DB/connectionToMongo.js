let mongoose = require("mongoose")
let Admin = mongoose.mongo.Admin
require('dotenv').config()

mongoose.connect(process.env.MYMONGO3)
    .then(() => console.log(`MonogoDB is connected in = ${process.env.MYMONGO3}`))
    .catch(() => console.log(`Error: MonogoDB isn't connected`))

//      בשביל חיבור של מסדר נתונים ספציפי
// function connectToDatabase(nameOfSchool) {
//     mongoose.connect(`mongodb://localhost:27017/${nameOfSchool}`,{ useNewUrlParser: true },()=>{
//         console.log(`Monogo is connected, DB = ${nameOfSchool}`)
//     });

//     // return new Promise((resolve, reject)=>{

//     //     let connect = mongoose.createConnection("mongodb://localhost:27017/",()=>{

//     //         new Admin(connect.db).listDatabases(async (err, result)=>{
//     //             let list = result.databases
//     //             let check = await list.find(item=>item.name == nameOfSchool)
//     //             reject(check)
//     //         })
//     //     })
//     // })
// }


