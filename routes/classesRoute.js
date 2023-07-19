let { Router } = require("express")
let router = Router()

let {
   createOneClass,
   findOneClass,
   findClassById,
} = require("../functions/class_function")


router.get("/", async (req, res) => {
   try {
      res.status(200).send(await findAll())
   } catch (error) {
      res.status(400).send(error)
   }
})

router.get("/:classId", async (req, res) => {
   try {
      let { classId } = req.params
      console.log("classId == ",classId);
      let result = await findClassById(classId)
      console.log("result == ",result);
      res.status(200).send(await findClassById(classId))
   } catch (error) {
      res.status(400).send(error)
   }
})

// router.get("/", async (req, res) => {
//    try {
//       let { teacherId, classId } = req.params

//       res.status(200).send(await find____ByTeacherIdAndClassId(teacherId, classId))
//    } catch (error) {
//       res.status(400).send(error)
//    }
// })

// router.post("/", async (req, res) => {
//    try {
//       res.status(200).send(await createOne____(req.body))
//    } catch (error) {
//       res.status(400).send(error)

//    }
// })

// router.put("/", async (req, res) => {
//    try {
//       let data = await updataOne____(req.body.id, req.body)
//       res.status(200).send(data)
//    } catch (error) {
//       res.status(400).send(error)
//    }
// })

// router.delete("/", async (req, res) => {
//    try {

//       res.status(200).send(await deleteOne____(req.body.id))
//    } catch (error) {
//       res.status(400).send(error)
//    }
// })


module.exports = router