
let { createOneUser, findOneUser } = require("./user_function")
let { createOneClass, findOneClass } = require("./class_function")
let { createOneStudent, findOneStudent } = require("./student_function")
let { createProfession, findOneProfession } = require("./profession_function")
let { createOneExam, findOneExam } = require("./exam_function")


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

let createDefaultExams = async () => {

   let defaultExams = [
      {
         "_id": "64b022a56395e24404fd8e20",
         "teacherId": "64b01e7ca571052ebd9e4509",
         "className": "6469fc617ef693879e575c2e",
         "date": "7/13/2023",
         "examName": "מבחן 1",
         "examList": [
            {
              "nameStudent": "אוראל",
              "id": "6469fc617ef693879e575c30",
              "score": 100
            },
            {
              "nameStudent": "שלמה",
              "id": "6469fc617ef693879e575c41",
              "score": 78
            },
            {
              "nameStudent": "יעקב",
              "id": "6469fc617ef693879e575c52",
              "score": 45
            },
            {
              "nameStudent": "ישראל",
              "id": "6469fc617ef693879e575c63",
              "score": 97
            },
            {
              "nameStudent": "שמעון",
              "id": "6469fc617ef693879e575c74",
              "score": 56
            }
          ],
         "average": 70,
         "__v": 0
      },
      {
         "_id": "64b022bc6395e24404fd8e27",
         "teacherId": "64b01e7ca571052ebd9e4509",
         "className": "6469fc617ef693879e575c2e",
         "date": "7/10/2023",
         "examName": "מבחן 2",
         "examList": [
            {
              "nameStudent": "אוראל",
              "id": "6469fc617ef693879e575c30",
              "score": 78
            },
            {
              "nameStudent": "שלמה",
              "id": "6469fc617ef693879e575c41",
              "score": 55
            },
            {
              "nameStudent": "יעקב",
              "id": "6469fc617ef693879e575c52",
              "score": 31
            },
            {
              "nameStudent": "ישראל",
              "id": "6469fc617ef693879e575c63",
              "score": 88
            },
            {
              "nameStudent": "שמעון",
              "id": "6469fc617ef693879e575c74",
              "score": 95
            }
          ],
         "average": 58,
         "__v": 0
      },
      {
         "_id": "64b0239b4d099e5a1274a703",
         "teacherId": "64b01e7ca571052ebd9e4509",
         "className": "6469fc617ef693879e575c2e",
         "date": "7/13/2023",
         "examName": "מבחן 3",
         "examList": [
            {
              "nameStudent": "אוראל",
              "id": "6469fc617ef693879e575c30",
              "score": 100
            },
            {
              "nameStudent": "שלמה",
              "id": "6469fc617ef693879e575c41",
              "score": 100
            },
            {
              "nameStudent": "יעקב",
              "id": "6469fc617ef693879e575c52",
              "score": 53
            },
            {
              "nameStudent": "ישראל",
              "id": "6469fc617ef693879e575c63",
              "score": 100
            },
            {
              "nameStudent": "שמעון",
              "id": "6469fc617ef693879e575c74",
              "score": 99
            }
          ],
         "average": 88,
         "__v": 0
      }
   ]

   for (let item of defaultExams) {
      // createOneUser, findOneUser 
      let check = await findOneExam({ _id: item._id })
      if (!check) {
         let show = await createOneExam(item)
         // console.log("show = ", show);
      }
   }

}


module.exports = {
   createDefaultUsers,
   createDefaultClass,
   createDefaultStudent,
   createDefaultProfession,
   createDefaultExams,
}