
let { createOneUser, findOneUser } = require("./user_function")
let { createOneClass, findClass, findOneClass } = require("./class_function")
let { createOneStudent, findOneStudent, findStudent } = require("./student_function")
let { createProfession, findOneProfession, findProfession } = require("./profession_function")
let { createOneExam, findOneExam, findExam } = require("./exam_function")
let { findOneDailydatas, createDailydatas, findDailydatas } = require("./dailydatas_function")

let usersFakeData = require("../fackData/mySchool.users.json")
let studentsFakeData = require("../fackData/mySchool.students.json")
let professionsFakeData = require("../fackData/mySchool.professions.json")
let classesFakeData = require("../fackData/mySchool.classes.json")
let examsFakeData = require("../fackData/mySchool.exams.json")
let dailydatasFakeData = require("../fackData/mySchool.dailydatas.json")


let createDefaultUsers = async () => {

   for (const userItem of usersFakeData) {
      let checkUser = await findOneUser({ name: userItem.name, email: userItem.email })
      if (!checkUser) {
         let showUser = await createOneUser(userItem)
         // console.log("showUser = ", showUser);
      }
   }

}

let createDefaultStudent = async () => {

   let checkIfHaveData = await findStudent()
   if (!checkIfHaveData[0]) {
      console.log("create studentsFakeData ***** == ");
      for (let studentItem of studentsFakeData) {
         let checkStudent = await findOneStudent({ nameStudent: studentItem.nameStudent, identify: studentItem.identify })
         // console.log("checkStudent = ", checkStudent);
         if (!checkStudent) {
            let showStudent = await createOneStudent(studentItem)
            // console.log("showStudent = ", showStudent);
         }
      }
   }

}

let createDefaultClass = async () => {

   let checkIfHaveData = await findClass()
   if (!checkIfHaveData[0]) {
      console.log("create classesFakeData ***** == ");
      for (let classItem of classesFakeData) {
         let checkClass = await findOneClass({ nameOfClass: classItem.nameOfClass })
         // console.log("checkClass = ", checkClass);
         if (!checkClass) {
            let showClass = await createOneClass(classItem)
            // console.log("showClass = ", showClass);
         }
      }
   }

}

let createDefaultProfession = async () => {

   let checkIfHaveData = await findProfession()
   if (!checkIfHaveData[0]) {
      console.log("create professionsFakeData ***** == ");
      for (let item of professionsFakeData) {
         let check = await findOneProfession({ _id: item._id })
         if (!check) {
            let show = await createProfession(item)
            // console.log("show = ", show);
         }
      }
   }

}

let createDefaultExams = async () => {

   let checkIfHaveData = await findExam()
   if (!checkIfHaveData[0]) {
      console.log("create examsFakeData ***** == ");
      for (let item of examsFakeData) {
         let check = await findOneExam({ _id: item._id })
         if (!check) {
            let show = await createOneExam(item)
            // console.log("show = ", show);
         }
      }
   }

}

let createDefaultDailydatas = async () => {
   let checkIfHaveData = await findDailydatas()
   if (!checkIfHaveData[0]) {
      console.log("create dailydatasFakeData ***** == ");
      for (let item of dailydatasFakeData) {
         let check = await findOneDailydatas({ _id: item._id })
         if (!check) {
            let show = await createDailydatas(item)
            // console.log("show = ", show);
         }
      }
   }

}


module.exports = {
   createDefaultUsers,
   createDefaultClass,
   createDefaultStudent,
   createDefaultProfession,
   createDefaultExams,
   createDefaultDailydatas,
}