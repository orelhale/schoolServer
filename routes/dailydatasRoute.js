let { Router } = require("express")
let router = Router()


let {
   deleteDailydatas,
   updataOneDailydatas,
   createDailydatas,
   findDailydatasByTeacherIdAndClassId,
   findOneDailydatas,
   findOneDailydatasById,
} = require("../functions/dailydatas_function")



router.get("/:teacherId/:classId", async (req, res) => {
   try {
      let { teacherId, classId } = req.params

      res.status(200).send(await findDailydatasByTeacherIdAndClassId(teacherId, classId))
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
      let data = await updataOneDailydatas(req.body.id, req.body)
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


module.exports = router