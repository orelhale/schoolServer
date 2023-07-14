
let {
   create,
   student_findStudent,
   student_findOneStudent,
   student_updateOneStudent,
   student_deleteOneStudent,
   student_deleteManyStudent,
   student_insertManyStudent,
   student_updateManyStudent,


   find,
   findOne,
   updateOne,
   findById,
   deleteById,
} = require("../models/StudentsModel")


let {
   findOneClass
} = require("../functions/class_function")


let createOneStudent = async (data) => {
   try {
      if (!data)
         throw ("Data is empty")
      return await create(data);
   } catch (error) {
      console.log("error = ",error);
      throw error
   }
}


let findOneStudent = async (condition, columns) => {
   try {
      if (!condition)
      throw ("Condition is null");
      
      return await student_findOneStudent(condition, columns)
   } catch (error) {
      console.log("error = ",error);
      throw error
   }
}


// let findAllStudentByClassId = async (classId, columns) => {
//    try {
//       if (!classId)
//          throw ("classId is null");
      
//       let findClass = await findOneClass({_id: classId})

//       if (!findClass)
//          throw ("classId not exist");
      
//       return await student_findOneStudent(condition, columns)
      
//    } catch (error) {
//       console.log("error = ",error);
//       throw error
//    }
// }

module.exports = { createOneStudent, findOneStudent }
