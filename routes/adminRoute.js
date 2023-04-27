let express = require("express")
let router = express.Router()

let { users_findUser, users_findOneUser, users_updateOneUser } = require("../models/UsersModel")

let { student_deleteOneStudent, student_deleteManyStudent, student_insertManyStudent, student_updateManyStudent} = require("../models/StudentsModel")

let {
    classes_findClass,
    classes_findOneAndUpdateClass,
    classes_findOneClass,
    classes_updateOneClass,
    classes_createClass,
    classes_findByIdAndUpdateClass,
    classes_findByIdClass,
    classes_deleteOneClass
} = require("../models/ClassesModel");




router.get("/", (req, res) => {
    res.send("admin")
})



router.get("/getAllUsers", async (req, res) => {
    try {
        let usersListData = await users_findUser({}, "-password -__v -nameSchool");
        res.status(200).send(usersListData)
    } catch (err) {
        res.status(400).send("err in getAllUsers")
    }
})



router.post("/getOneUsers", async (req, res) => {
    try {
        let dataFromClient = req.body;
        // console.log("dataFromClient = ", dataFromClient);
        let userData = await users_findOneUser({ _id: dataFromClient.id })
        res.status(200).send(userData)
    } catch (err) {
        res.status(400).send("err in getOneUsers")
    }
})



router.put("/editUser", async (req, res) => {
    try {
        let dataFromClient = req.body;
        // console.log("dataFromClient = ", dataFromClient);
        await users_updateOneUser({ _id: dataFromClient.id }, { class_permission: dataFromClient.class_permission, level_permission: dataFromClient.level_permission })
        res.status(200).send(dataFromClient)
    } catch (err) {
        res.status(400).send("err in editUser")
    }

})



// מחזיר מערך של כל השמות של הכיתות
// לתקן: את השם של הפונקציה, משום שהפונקציה מחזירה רק את השמות של הכיתה
router.get("/getListOfAllTheClasses", async (req, res) => {
    try {
        let dataFromDatabase = await classes_findClass({}, "nameOfClass -_id")
        let listClass = dataFromDatabase.map(item => item.nameOfClass)
        // console.log("listClass = ",listClass);
        res.status(200).send(listClass)
    } catch (err) {
        res.status(400).send("err in getListOfAllTheClasses")
    }
})



//              לבנתיים לא בשימוש        
//  מחזיר מערך של כל השמות של הכיתות עם המזהה שלהם 
router.get("/getListOf_ClassNameAndClassId", async (req, res) => {
    try {
        let dataFromDatabase = await classes_findClass({}, "nameOfClass _id");
        res.status(200).send(dataFromDatabase)
    } catch (err) {
        res.status(400).send("err in getListOf_ClassNameAndClassId")
    }
})



// מחזיר מערך של כל הנתונים של הכיתות
router.get("/getListOfAllTheClassesWithStudents", async (req, res) => {
    try {
        let dataFromDatabase = await classes_findClass({}, "-__v")
        // console.log("dataFromDatabase = ",dataFromDatabase);
        res.status(200).send(dataFromDatabase)

    } catch (err) {
        res.status(400).send("err in getListOfAllTheClassess")
    }
})



// יצירת כיתה חדשה + התלמידים שלה
router.post("/addNewClass", async (req, res) => {
    try {
        let dataFromClient = req.body

        let checkIfClassExist = await classes_findOneClass({ nameOfClass: dataFromClient.nameOfClass }, " -__v")

        if (checkIfClassExist) {
            return res.status(400).send("This class name already exist");
        }

        let dataToServer = {
            nameOfClass: dataFromClient.nameOfClass,
            listStudents: dataFromClient.listStudents,
            nameOfSchool: dataFromClient.nameOfSchool,
        }

        let newDateOfClass = await classes_createClass(dataToServer)
        newDateOfClass.save()
        // console.log("newDateOfClass = ",newDateOfClass);

        let newListStudent = dataFromClient.listStudents.map((student) => {
            student.classId = newDateOfClass._id
            return student
        })
        // console.log("newListStudent = ",newListStudent);
        let listStudentsFromServer = await student_insertManyStudent(newListStudent)
        // console.log("listStudentsFromServer = ",listStudentsFromServer);
        let upDateListStudentOfClass = await classes_findByIdAndUpdateClass({ _id: newDateOfClass._id }, { listStudents: listStudentsFromServer })
        // מישום מה רשימת הסטודנטים שחוזרת למשתנה היא רשימת הסטודנטים הישנה ולא המעודכנת לכן אני מעדכן אותה ידנית
        upDateListStudentOfClass.listStudents = listStudentsFromServer;


        // let newListStudent2 = newDateOfClass.listStudents.map((student)=>{
        //     let currentStudent = listStudentsFromServer.find((item) => item.identify == student.identify);
        //     if(currentStudent){
        //         student._id = currentStudent._id
        //         return student;
        //     }
        // })
        // let upDateListStudentOfClass = await classes_findByIdAndUpdateClass({_id: newDateOfClass._id}, {listStudents: newListStudent2})


        // console.log("upDateListStudentOfClass = ",upDateListStudentOfClass);
        res.status(200).send(upDateListStudentOfClass);
    } catch (err) {
        console.log(err);
        // console.log("err in - admin addNewClass");
        res.status(400).send("err in - admin addNewClass");
    }
})




router.delete("/deleteClassAndAllHisStudents", async (req, res) => {
    try {
        let dataToDelete = req.query.classToDelete
        let deleteClass = await classes_deleteOneClass({ _id: dataToDelete })
        let deleteAllStudents = await student_deleteManyStudent({ classId: dataToDelete })

        res.status(200).send({ deleteAllStudents: deleteAllStudents, deleteClass: deleteClass });
    } catch (err) {
        console.log("err in - admin deleteClassAndAllHisStudents");
        res.status(400).send("err in - admin deleteClassAndAllHisStudents");
    }
})



//      ערכית כיתה קיימת 
router.put("/editClass", async (req, res) => {
    try {

        let classToEdit = req.body;

        let currentClass = await classes_findByIdClass(classToEdit._id)
        if (!currentClass) {
            console.log("not fined class");
            return res.status(400).send("err in - not fined class");
        }

        let arrStudentToAdd = [...classToEdit.listStudents]
        let arrStudentToDelete = currentClass.listStudents
        let arrStudentToCheckChange = []
        let dataOfTheNewClass = classToEdit
        let newListStudent = []

        console.log("11 arrStudentToAdd = ", arrStudentToAdd);
        console.log("11 arrStudentToDelete = ", arrStudentToDelete);
        // בדיקה: אם נוסף תלמיד או נמחק תלמיד - ואם כן אז לעדכן
        // console.log("j = ",arrStudentToAdd.length);
        for (let i = 0; i < arrStudentToAdd.length; i++) {
            for (let j = 0; j < arrStudentToDelete.length; j++) {
                // console.log("1 = ",arrStudentToAdd[i]._id);
                // console.log("2 = ",arrStudentToAdd[j]._id);
                if (arrStudentToAdd[i]._id == arrStudentToDelete[j]._id) {
                    // console.log("arrStudentToAdd[i] = ", arrStudentToAdd[i]);
                    // console.log("arrStudentToDelete[j] = ", arrStudentToDelete[j]);
                    if (JSON.stringify(arrStudentToAdd[i]) != JSON.stringify(arrStudentToDelete[j])) {
                        arrStudentToCheckChange.push(arrStudentToDelete[j]);
                    }
                    newListStudent.push(arrStudentToAdd.splice(i, 1)[0]);
                    arrStudentToDelete.splice(j, 1);
                    j--;
                    i--;
                    break;
                }
            }
        }

        // console.log("===========================");
        // הדפסות של- תלמידים להוספהץ תלמידים למחיקה, תלמידים לשינוי נתונים
        console.log("arrStudentToCheckChange = ", arrStudentToCheckChange);
        console.log("arrStudentToAdd = ", arrStudentToAdd);
        console.log("arrStudentToDelete = ", arrStudentToDelete);


        try {
            //  <- בודק את מערך "מחיקת תלמידים" אם צריך למחוק תלמידים
            // ואם כן הוא מוחק אותם מהקולקשן של התלמדים
            if (arrStudentToDelete[0]) {
                let arrDelete = arrStudentToDelete.map((student) => student._id)
                console.log("Students were deleted");
                let _onlyToTest_needToDelete = []
                for (let i = 0; i < arrDelete.length; i++) {
                    let s = await student_deleteOneStudent({ _id: arrDelete[i] })
                    _onlyToTest_needToDelete.push(s)
                }
                console.log("_onlyToTest_needToDelete = ", _onlyToTest_needToDelete);
                console.log("yes");
            }
            //  <- בודק את מערך "הוספת תלמידים חדשים" אם צריך להוסיף תלמידים
            // ואם כן הוא מוסיף אותם לקולקשן של התלמידים 
            if (arrStudentToAdd[0]) {
                console.log("New students have been added");

                arrStudentToAdd = arrStudentToAdd.map(student => {
                    student.classId = classToEdit._id
                    return student;
                })
                let newStudents = await student_insertManyStudent(arrStudentToAdd)
                console.log("yes");
                // newListStudent.push(newStudents)
                newListStudent = newListStudent.concat(newStudents);
                // console.log("newListStudent = ",newListStudent);

            }
        } catch (err) {
            console.log("2");
            console.log(err);
        }


        try {
            //  בדיקה: אם השם של הכיתה השתנה -> ואם כן לעדכן את שם של הכיתה
            if (currentClass.nameOfClass != classToEdit.nameOfClass) {
                console.log("nameOfClass is change");
                dataOfTheNewClass = await classes_findOneAndUpdateClass({ _id: classToEdit._id }, { nameOfClass: classToEdit.nameOfClass })
                dataOfTheNewClass.nameOfClass = classToEdit.nameOfClass;
                console.log("yes");
            }
            // <- בודק את מערך עבור תלמידים קיים שהשתנה אצלם נתונים
            // (בקולקשן של התלמידים) ואם כן אז הוא מעדכן את הנתונים של התלמידים
            if (arrStudentToCheckChange[0]) {
                // console.log("arrStudentToCheckChange");
                await student_updateManyStudent(arrStudentToCheckChange)
                // לעשות הזדמנות: צאיך לעדכן את הנתונים החדשים אצל רשימת כיתה
                console.log("yes");
            }
            // <- בודק אם היה צריך לבצע שינוי כלשהו ברשימת התלמידים 
            //  ואם כן אז הוא מעדכן את רשימת הסטודנטים של הכיתה
            if (arrStudentToDelete[0] || arrStudentToAdd[0] || arrStudentToCheckChange[0]) {
                console.log("The listStudents of the class has changed");
                // console.log("newListStudent = ",newListStudent);
                dataOfTheNewClass = await classes_findOneAndUpdateClass({ _id: classToEdit._id }, { listStudents: newListStudent })
                dataOfTheNewClass.listStudents = newListStudent;
                console.log("yes");
            }
        } catch (err) {
            console.log("3");
            console.log(err);
        }

        // console.log("dataOfTheNewClass = ",dataOfTheNewClass);
        res.status(200).send(dataOfTheNewClass);
    } catch (err) {
        console.log("err in - admin editClass");
        console.log(err);
        res.status(400).send("err in - admin editClass");
    }
})



// עדיין לא בשימוש
router.put("/updateClass", async (req, res) => {
    try {
        let dataFromClient = req.body
        let updateClass = await classes_updateOneClass({ nameOfClass: dataFromClient.oldNameClass }, dataFromClient)
        // let deleteSudents = await student_deleteManyStudent({nameOfClass: nameOfClass})
        res.status(200).send(updateClass);
    } catch (err) {
        console.log("err in - admin updateClass");
        res.status(400).send("err in - admin updateClass");
    }
})



module.exports = router