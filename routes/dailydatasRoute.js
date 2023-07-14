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
      // let date = new Date()

      // let condition = {
      //    teacherId,
      //    classId,
      //    year: year || date.getFullYear(),
      // }
      let result = await findDailydatasBySpecificCondition({ teacherId, classId, year, month })
      result = result ? result.dailyDataList.find(item => item.day == day) : result

      console.log("result == ",result);
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


module.exports = router