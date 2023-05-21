
let { createOneUser, findOneUser } = require("./user_function")
let { createOneClass, findOneClass } = require("./class_function")
let { createOneStudent, findOneStudent } = require("./student_function")
let { createProfession, findOneProfession } = require("./profession_function")


let createDefaultUsers = async () => {

   let defaultUsers = [
      {
         name: "shira",
         email: "shira@gmail.com",
         password: "1",
         level_permission: "teacher",
         nameSchool: "mySchool",
         class_permission: ["6469fc617ef693879e575c2e"]
      }, {
         name: "orel",
         email: "orel@gmail.com",
         password: "1",
         level_permission: "admin",
         nameSchool: "mySchool"
      }, {
         name: "aliya",
         email: "aliya@gmail.com",
         password: "1",
         level_permission: "Unauthorized",
         nameSchool: "mySchool"
      }
   ]

   for (const userItem of defaultUsers) {
      let checkUser = await findOneUser({ name: userItem.name, email: userItem.email })
      if (!checkUser) {
         let showUser = await createOneUser(userItem)
         // console.log("showUser = ", showUser);
      }
   }

}

let createDefaultStudent = async () => {
   let defaultStudent = [
      {
         "nameStudent": "אוראל",
         "nameOfClass": "יא",
         "identify": "1",
         "schoolName": "mySchool",
         "classId": "6469fc617ef693879e575c2e",
         "_id": "6469fc617ef693879e575c30",
      },
      {
         "nameStudent": "שלמה",
         "nameOfClass": "יא",
         "identify": "3",
         "schoolName": "mySchool",
         "classId": "6469fc617ef693879e575c2e",
         "_id": "6469fc617ef693879e575c41",
      },
      {
         "nameStudent": "יעקב",
         "nameOfClass": "יא",
         "identify": "4",
         "schoolName": "mySchool",
         "classId": "6469fc617ef693879e575c2e",
         "_id": "6469fc617ef693879e575c52",
      },
      {
         "nameStudent": "ישראל",
         "nameOfClass": "יא",
         "identify": "5",
         "schoolName": "mySchool",
         "classId": "6469fc617ef693879e575c2e",
         "_id": "6469fc617ef693879e575c63",
      },
      {
         "nameStudent": "שמעון",
         "nameOfClass": "יא",
         "identify": "6",
         "schoolName": "mySchool",
         "classId": "6469fc617ef693879e575c2e",
         "_id": "6469fc617ef693879e575c74",
      }
   ]

   for (let studentItem of defaultStudent) {
      // createOneUser, findOneUser 
      let checkStudent = await findOneStudent({ nameStudent: studentItem.nameStudent, identify: studentItem.identify })
      // console.log("checkStudent = ", checkStudent);
      if (!checkStudent) {
         let showStudent = await createOneStudent(studentItem)
         // console.log("showStudent = ", showStudent);
      }
   }

}

let createDefaultClass = async () => {
   let defaultClass = [
      {
         "_id": "6469fc617ef693879e575c2e",
         nameOfClass: "יא",
         listStudents: [
            {
               "nameStudent": "אוראל",
               "nameOfClass": "יא",
               "identify": "1",
               "schoolName": "mySchool",
               "classId": "6469fc617ef693879e575c2e",
               "_id": "6469fc617ef693879e575c30",
            },
            {
               "nameStudent": "שלמה",
               "nameOfClass": "יא",
               "identify": "3",
               "schoolName": "mySchool",
               "classId": "6469fc617ef693879e575c2e",
               "_id": "6469fc617ef693879e575c31",
            },
            {
               "nameStudent": "יעקב",
               "nameOfClass": "יא",
               "identify": "4",
               "schoolName": "mySchool",
               "classId": "6469fc617ef693879e575c2e",
               "_id": "6469fc617ef693879e575c32",
            },
            {
               "nameStudent": "ישראל",
               "nameOfClass": "יא",
               "identify": "5",
               "schoolName": "mySchool",
               "classId": "6469fc617ef693879e575c2e",
               "_id": "6469fc617ef693879e575c33",
            },
            {
               "nameStudent": "שמעון",
               "nameOfClass": "יא",
               "identify": "6",
               "schoolName": "mySchool",
               "classId": "6469fc617ef693879e575c2e",
               "_id": "6469fc617ef693879e575c34",
            }
         ],
         "nameOfSchool": "mySchool",
      }
   ]

   for (let classItem of defaultClass) {
      // createOneUser, findOneUser 
      let checkClass = await findOneClass({ name: classItem.name, email: classItem.email })
      // console.log("checkClass = ", checkClass);
      if (!checkClass) {
         let showClass = await createOneClass(classItem)
         // console.log("showClass = ", showClass);
      }
   }

}

let createDefaultProfession = async () => {
   let defaultStudent = [
      {
         "_id": "646a0567f77b8224bfc001a9",
         "name": "חשבון",
      },
      {
         "_id": "646a056bf77b8224bfc001ab",
         "name": "אנגלית",
      },
      {
         "_id": "646a056ff77b8224bfc001ad",
         "name": "ספורט",
      },
      {
         "_id": "646a0582f77b8224bfc001af",
         "name": "היסטוריה",
      }
   ]

   for (let item of defaultStudent) {
      // createOneUser, findOneUser 
      let check = await findOneProfession({ _id: item._id })
      if (!check) {
         let show = await createProfession(item)
         // console.log("show = ", show);
      }
   }

}

module.exports = {
   createDefaultUsers,
   createDefaultClass,
   createDefaultStudent,
   createDefaultProfession,
}