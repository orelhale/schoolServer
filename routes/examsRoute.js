let { Router } = require("express")
let router = Router()

let {
   deleteOneExam,
   updataOneExam,
   createOneExam,
   findExamsByTeacherIdAndClassId,
   findOneExam,
   findOneExamById,
} = require("../functions/exam_function")


router.get("/:teacherId/:classId", async (req, res) => {
   try {
      let { teacherId, classId } = req.params

      res.status(200).send(await findExamsByTeacherIdAndClassId(teacherId, classId))
   } catch (error) {
      res.status(400).send(error)
   }
})

router.post("/", async (req, res) => {
   try {
      res.status(200).send(await createOneExam(req.body))
   } catch (error) {
      res.status(400).send(error)

   }
})

router.put("/", async (req, res) => {
   try {
      let data = await updataOneExam(req.body.id, req.body)
      res.status(200).send(data)
   } catch (error) {
      res.status(400).send(error)
   }
})

router.delete("/", async (req, res) => {
   try {

      res.status(200).send(await deleteOneExam(req.body.id))
   } catch (error) {
      res.status(400).send(error)
   }
})

router.get("/average/:teacherId/:classId", async (req, res) => {
   try {
      let { teacherId, classId } = req.params
      let examList  = await findExamsByTeacherIdAndClassId(teacherId, classId)

      let listAverage = []

      examList.forEach(exam => {

         console.log("exam == ",exam);
         exam.examList.forEach(stu => {
            console.log("stu == ",stu);
            let obj
            if(listAverage.length){
               obj = listAverage.length && listAverage.find(e => e.studentId && e.studentId == stu.id)
            }
            // console.log("obj == ",obj);
            if(!obj){
               obj = {}
               obj.studentId = stu.id
               obj.studentName = stu.nameStudent
               obj.average = 0
               obj.examList = []
               
               listAverage.push(obj)
            }
            // console.log("listAverage == ",listAverage);
            obj.examList.push({
               examId: exam._id,
               examDate: exam.date,
               score: Number(stu.score),
            })
            obj.average += Number(stu.score)
         })

      })

      listAverage.forEach(avr => avr.average = Math.ceil(avr.average / examList.length))

      console.log("listAverage == ",listAverage);
      // console.log("classId == ",classId);

      res.status(200).send(listAverage)
   } catch (error) {
      res.status(400).send(error)
   }
})


// router.get("/average/:studentId", async (req, res) => {
//    try {
//       let { teacherId, classId } = req.params
//       let examList  = await findExamsByTeacherIdAndClassId(teacherId, classId)

//       let listAverage = []

//       examList.forEach(exam => {

//          console.log("exam == ",exam);
//          exam.examList.forEach(stu => {
//             console.log("stu == ",stu);
//             let obj
//             if(listAverage.length){
//                obj = listAverage.length && listAverage.find(e => e.studentId && e.studentId == stu.id)
//             }
//             // console.log("obj == ",obj);
//             if(!obj){
//                obj = {}
//                obj.studentId = stu.id
//                obj.studentName = stu.nameStudent
//                obj.average = 0
//                obj.examList = []
               
//                listAverage.push(obj)
//             }
//             // console.log("listAverage == ",listAverage);
//             obj.examList.push({
//                examId: exam._id,
//                examDate: exam.date,
//                score: Number(stu.score),

//                classId: exam.className,
//                teacherId: exam.teacherId,
//             })
//             obj.average += Number(stu.score)
//          })

//       })

//       listAverage.forEach(avr => avr.average = Math.ceil(avr.average / examList.length))

//       // console.log("teacherId == ",teacherId);
//       // console.log("classId == ",classId);

//       res.status(200).send(listAverage)
//    } catch (error) {
//       res.status(400).send(error)
//    }
// })





module.exports = router