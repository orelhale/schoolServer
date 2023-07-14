let express = require("express")
let router = express.Router()

let { StudentsModel } = require("../models/StudentsModel")
let { student_findStudent, student_findOneStudent, student_updateOneStudent } = require("../models/StudentsModel")
let { DailyDatasModel } = require("../models/DailyDatasModel")
let { exams_createExam, exams_updateOneExam, exams_findOneExam, exams_findExam } = require("../models/ExamsModel")
let { deleteOneExam } = require("../functions/exam_function")

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



// עדיין בשישמוש אבל צריך להחליף בקוד בין השאילתה הזו לשאילתה הבאה
router.post("/GetListOfStudentsInSpecificClassesWithId", async (req, res) => {
    try {
        let dataFromCleient = req.body.nameOfClass
        // console.log("dataFromCleient =",dataFromCleient);
        let studentListData = await student_findStudent({ classId: dataFromCleient })
        // console.log("studentListData = ",studentListData);
        let listStudents = studentListData.map(item => item.nameStudent)
        res.status(200).send(studentListData)
    } catch (err) {
        res.status(400).send("err in GetListOfStudentsInSpecificClassesWithId")
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
    let { teacherId, className, examName, date } = req.body


    let obj = {
        teacherId: teacherId,
        className: className,
        examName: examName,
        date: date,
    }

    let searchExam = await exams_findOneExam(obj);

    if (searchExam) {
        console.log("addExam update");
        let checkUpdate = await exams_updateOneExam(obj, { examList: requestFromClient.examList });
        return res.status(200).send(checkUpdate);
    }

    // obj.examList = requestFromClient.examList
    // obj.examList = requestFromClient.examList

    let newExam = await exams_createExam(requestFromClient);
    console.log("newExam = ", newExam);
    newExam.save();

    res.status(200).send(newExam);
})



// router.post("/getAllExamsFromOneTeacher", async (req, res) => {
//     let teacherDetails = req.body
//     let allExams = await exams_findExam({ teacherId: teacherDetails.teacherId, className: teacherDetails.className });
//     res.status(200).send(allExams);
// })



// router.delete("/deleteExam", async (req, res) => {
//     try {
//         await deleteOneExam(req.body.id)
//         res.status(200).send("The exam was successfully deleted")
//     } catch (err) {
//         res.status(400).send("Failed to delete the test")
//     }
// })


module.exports = router