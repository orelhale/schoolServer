let { Router } = require("express")
let router = Router()

let {
   deleteOne____,
   updataOne____,
   createOne____,
   find____ByTeacherIdAndClassId,
   findOne____,
   findOne____ById,
} = require("../server")



router.get("/:teacherId/:classId", async (req, res) => {
   try {
      let { teacherId, classId } = req.params

      res.status(200).send(await find____ByTeacherIdAndClassId(teacherId, classId))
   } catch (error) {
      res.status(400).send(error)
   }
})

router.post("/", async (req, res) => {
   try {
      res.status(200).send(await createOne____(req.body))
   } catch (error) {
      res.status(400).send(error)

   }
})

router.put("/", async (req, res) => {
   try {
      let data = await updataOne____(req.body.id, req.body)
      res.status(200).send(data)
   } catch (error) {
      res.status(400).send(error)
   }
})

router.delete("/", async (req, res) => {
   try {

      res.status(200).send(await deleteOne____(req.body.id))
   } catch (error) {
      res.status(400).send(error)
   }
})


module.exports = router