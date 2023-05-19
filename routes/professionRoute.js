let { Router } = require("express")
let router = Router()

let {
   findAllProfession,
   createProfession,
   updataOneProfession,
   deleteProfession,
} = require("../functions/profession_function")


router.get("/", async (req, res) => {
   try {
      res.status(200).send(await findAllProfession())
   } catch (error) {
      res.status(400).send(error)
   }
})

router.post("/", async (req, res) => {
   try {
      res.status(200).send(await createProfession(req.body))
   } catch (error) {
      res.status(400).send(error)

   }
})

router.put("/", async (req, res) => {
   try {
      let data = await updataOneProfession(req.body.id, req.body)
      res.status(200).send(data)
   } catch (error) {
      res.status(400).send(error)
   }
})

router.delete("/", async (req, res) => {
   try {
      await deleteProfession(req.body.id)
      res.status(200).send()
   } catch (error) {
      res.status(400).send(error)
   }
})


module.exports = router