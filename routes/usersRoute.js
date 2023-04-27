let express = require("express")
let router = express.Router()

let { StudentsModel } = require("../models/StudentsModel")
let { student_findStudent, student_findOneStudent, student_updateOneStudent } = require("../models/StudentsModel")
let { DailyDatasModel } = require("../models/DailyDatasModel")
let { ExamsModel } = require("../models/ExamsModel")


router.get("/", (req, res) => {
    res.send("users")
})



// עדיין בשישמוש אבל צריך להחליף בקוד בין השאילתה הזו לשאילתה הבאה
router.post("/GetListOfStudentsInSpecificClasses", async (req, res) => {
    try {
        let dataFromCleient = req.body.nameOfClass
        // console.log("dataFromCleient =",dataFromCleient);
        let studentListData = await student_findStudent({ classId: dataFromCleient })
        // console.log("studentListData = ",studentListData);
        let listStudents = studentListData.map(item => item.nameStudent)
        res.status(200).send(listStudents)
    } catch (err) {
        res.status(400).send("err in GetListOfStudentsInSpecificClasses")
    }
})




router.put("/addNewDailyData", async (req, res) => {
    try {
        let dataFromClient = req.body

        let dataFromDatabase = await DailyDatasModel.findOne({ "month": dataFromClient.month })
        dataFromDatabase = dataFromDatabase.data

        if (!dataFromDatabase[dataFromClient.day]) {
            dataFromDatabase[dataFromClient.day] = []
            dataFromDatabase[dataFromClient.day].push({ TeacherIdentification: dataFromClient.TeacherIdentification, data: dataFromClient.dataForSave })
        } else {
            let index = dataFromDatabase[dataFromClient.day].findIndex((item) => { return item.TeacherIdentification == dataFromClient.TeacherIdentification })

            if (index != -1) {
                dataFromDatabase[dataFromClient.day][index] = { TeacherIdentification: dataFromClient.TeacherIdentification, data: dataFromClient.dataForSave }
            } else {
                dataFromDatabase[dataFromClient.day].push({ TeacherIdentification: dataFromClient.TeacherIdentification, data: dataFromClient.dataForSave })
            }
        }


        let table = await DailyDatasModel.updateOne({ "month": dataFromClient.month }, { data: dataFromDatabase })

        res.status(200).send(table)
    } catch (err) {
        res.status(400).send("err in -> users addNewDailyData")
    }
})



router.post("/getDailyDataOfSpecificClass", async (req, res) => {
    try {
        console.log("getDailyDataOfSpecificClass");
        let dataFromClient = req.body
        let dataFromDatabase = await DailyDatasModel.findOne({ month: dataFromClient.month })


        // מוודא שיש במסד נתונים מערך של 12 חודשים - אחרת הוא יוצר אותו
        if (!dataFromDatabase) {
            console.log("*****");
            console.log("*****");
            console.log("***** מוודא שיש במסד נתונים מערך של 12 חודשים - אחרת הוא יוצר אותו *****");
            console.log("***** מוודא שיש במסד נתונים מערך של 12 חודשים - אחרת הוא יוצר אותו *****");
            console.log("***** מוודא שיש במסד נתונים מערך של 12 חודשים - אחרת הוא יוצר אותו *****");
            console.log("*****");
            console.log("-------------------");
            for (let index = 0; index <= 11; index++) {
                let model = new DailyDatasModel({ month: index + "", data: [] })
                model.save()
            }
            return res.status(200).send(null)
        }


        if (!dataFromDatabase.data[dataFromClient.day]) {
            console.log("No day");
            return res.status(200).send(null)
        }
        dataFromDatabase = await dataFromDatabase.data[dataFromClient.day].find((item) => item.TeacherIdentification == dataFromClient.TeacherIdentification)

        if (!dataFromDatabase) {
            console.log("No information");
            return res.status(200).send(null)
        }

        res.status(200).send(dataFromDatabase)

    } catch (err) {
        res.status(400).send("err in -> users GiveDailyDataOfSpecificClass")
    }
})



router.post("/addExam", async (req, res) => {
    let requestFromClient = req.body


    let obj = {
        teacherId: requestFromClient.teacherId,
        className: requestFromClient.className,
        examName: requestFromClient.examName,
        date: requestFromClient.date,
    }

    let searchExam = await ExamsModel.findOne(obj);

    if (searchExam) {
        console.log("addExam update");
        let checkUpdate = await ExamsModel.updateOne(obj, { examList: requestFromClient.examList });
        return res.status(200).send(checkUpdate);
    }

    // obj.examList = requestFromClient.examList
    // obj.examList = requestFromClient.examList

    let newExam = new ExamsModel(requestFromClient);
    console.log("newExam = ", newExam);
    newExam.save();

    res.status(200).send(newExam);
})



router.post("/getAllExamsFromOneTeacher", async (req, res) => {
    let teacherDetails = req.body
    let allExams = await ExamsModel.find({ teacherId: teacherDetails.teacherId, className: teacherDetails.className });
    console.log("allExams = ", allExams);
    res.status(200).send(allExams);
})



router.delete("/deleteExam", async (req, res) => {
    let dataToDelete = req.query.id
    console.log("deleteExam id = ", dataToDelete);
    try {
        // let eee = await ExamsModel.findOne({_id: req.body.id})
        // console.log("eee id = ",eee);
        let deleteExam = await ExamsModel.deleteOne({ _id: dataToDelete })

        if (deleteExam.deletedCount > 0) {
            return res.status(200).send(deleteExam)
        }
        res.status(400).send("Failed to delete the test")
    } catch (err) {
        res.status(400).send("err in deleteExam")
        console.log("err in deleteExam");
    }
})


module.exports = router