let { Router } = require("express")
let router = Router()


let {
   deleteDailydatas,
   updataOneDailydatas,
   createDailydatas,
   findDailydatasByTeacherIdAndClassId,
   findOneDailydatas,
   findOneDailydatasById,
   findDailydatasBySpecificCondition,
} = require("../functions/dailydatas_function")

let {
   findStudentById,
   findById,
} = require("../functions/student_function")



router.get("/:teacherId/:classId", async (req, res) => {
   try {
      let { teacherId, classId } = req.params

      res.status(200).send(await findDailydatasByTeacherIdAndClassId(teacherId, classId))
   } catch (error) {
      res.status(400).send(error)
   }
})


router.get("/specific/:teacherId/:classId/:year/:month/:day", async (req, res) => {
   try {
      let { teacherId, classId, year, month, day } = req.params
      console.log("teacherId, classId, year, month, day");
      if(!teacherId || !classId || !year || !month, !day){
         throw("ERROR 555: data is missing")
      }

      let findDailydatas = await findDailydatasBySpecificCondition({ teacherId, classId, year, month })

      let result = findDailydatas.dailyDataList.find(item => item.day == day) 
      
      res.status(200).send(result)
   } catch (error) {
      res.status(400).send(error)
   }
})

router.post("/", async (req, res) => {
   try {
      res.status(200).send(await createDailydatas(req.body))
   } catch (error) {
      res.status(400).send(error)

   }
})

router.put("/", async (req, res) => {
   try {
      let data = await updataOneDailydatas(req.body.id, req.body.updata)
      res.status(200).send(data)
   } catch (error) {
      res.status(400).send(error)
   }
})

router.delete("/", async (req, res) => {
   try {

      res.status(200).send(await deleteDailydatas(req.body.id))
   } catch (error) {
      res.status(400).send(error)
   }
})


router.get("/average/:teacherId/:classId", async (req, res) => {
   try {
      let { teacherId, classId } = req.params

      let listOfDailydatas = await findDailydatasByTeacherIdAndClassId(teacherId, classId)

      console.log("listOfDailydatas == ",listOfDailydatas);

      let listAverage = []

      function setAttendance(student, attendance){
         if(attendance == "V")
            return student.present ++;
         
         if(attendance == "X")
            return student.absent ++;
         
         if(attendance.length > 1)
            return student.note.push(attendance);

         return student.other ++;
      }

      listOfDailydatas.forEach(m => { // loop on month
         m.dailyDataList.forEach(d =>{ // loop on day
            d.list.forEach(stu =>{ // loop on student
               
               let findStudent = listAverage.find(s => s.studentId == stu.studentId)
               if(!findStudent){
                  let newAverageStudent = {}
                  newAverageStudent.studentId = stu.studentId
                  newAverageStudent.present = 0
                  newAverageStudent.absent = 0
                  newAverageStudent.note = []
                  newAverageStudent.other = 0
                  newAverageStudent.attendanceData = []
                  listAverage.push(newAverageStudent)

                  // reference
                  findStudent = newAverageStudent
               }
               setAttendance(findStudent, stu.attendance)

               findStudent.attendanceData.push({attendance: stu.attendance, date: {year: m.year, month: m.month, day: d.day}})
            })
         })
      })

      let averageAttendanceData = {
         averageList: listAverage,
         classId: listOfDailydatas[0].classId,
         professionId: listOfDailydatas[0].professionId,
         teacherId: listOfDailydatas[0].teacherId,
      }

      let listId = []
      listAverage.forEach(async stu =>{
         listId.push(stu.studentId)
      })

      console.log("listAverage == ",listAverage);
      await Promise.all(listAverage.map(async stu => {
         // console.log("stu == ",stu);
         if(stu){
            let studentObj = await findById(stu.studentId);
            if(studentObj){
            // console.log("studentObj == ",studentObj);
            stu.studentName = studentObj.nameStudent 
            stu.family = studentObj.family 
         }
         }
      }));
      

      res.status(200).send(averageAttendanceData)
   } catch (error) {
      console.log("error == ",error);
      res.status(400).send(error)
   }
})



module.exports = router