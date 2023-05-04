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

module.exports = router