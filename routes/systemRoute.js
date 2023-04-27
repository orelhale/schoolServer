let express = require("express");
let jwt = require("jsonwebtoken");
let { users_findOneUser, users_createUser } = require("../models/UsersModel")

require('dotenv').config()
let mongoose = require("mongoose")

let { DailyDatasModel } = require("../models/DailyDatasModel")


let router = express.Router();


router.get("/", (req, res) => {
    try {
        res.status(200).send("system")
    } catch (err) {
        res.status(400).send("err in GetListOfStudentsInSpecificClasses")
    }
})



router.post("/login", async (req, res) => {

    let user = await users_findOneUser({ email: req.body.email }, "-Date -__v")

    try {
        if (!user) {
            return res.status(400).send("One of the data is incorrect")
        }

        if (user.password != req.body.password) {
            return res.status(400).send("One of the data is incorrect")
        }

        let dataToToken = {
            name: user.name,
            email: user.email,
            id: user._id,
            nameSchool: user.nameSchool,
            class_permission: user.class_permission,
            level_permission: user.level_permission,
        }

        let data = {}
        // data.token = jwt.sign(dataToToken, process.env.TOKEN_SECRET, {expiresIn: "30m"})
        data.token = jwt.sign(dataToToken, process.env.TOKEN_SECRET)
        data.level_permission = user.level_permission

        res.status(200).send(data)

    } catch (err) {
        res.status(400).send("err in login")
    }
})



router.post("/register", async (req, res) => {
    // console.log("login req.body = ",req.body);
    let user = await users_findOneUser({ email: req.body.email })
    try {
        if (user) {
            return res.status(400).send("this email already exist")
        }

        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            nameSchool: req.body.nameSchool
        }

        await users_createUser(newUser)

        res.status(200).send("registration succeeded")

    } catch (err) {
        return res.status(400).send("err in register")
    }
})



router.get("/checkToken", (req, res) => {
    let token = req.headers.token
    try {
        if (!token) {
            return res.status(400).send("you must send token")
        }

        let decodingToken = jwt.verify(token, process.env.TOKEN_SECRET)

        if (!decodingToken) {
            return res.status(400).send("you token not good")
        }
        res.status(200).send(decodingToken)

    } catch (err) {
        res.status(400).send("err in checkToken")
    }
})



router.get("/add_12_month_to_dailydatas_in_database", async (req, res) => {
    console.log("**** errrrr  add_12_month_to_dailydatas_in_database");
    try {
        for (let index = 0; index <= 11; index++) {
            let model = new DailyDatasModel({ month: index + "", data: [] })
            model.save()
        }
        res.status(200).send("yes")
    } catch (err) {
        res.status(400).send("no")
    }
})



router.delete("/deleteCollection", async (req, res) => {
    let data = await mongoose.connection.db.dropCollection(req.body.name)
    res.status(200).send(data)
})



module.exports = router