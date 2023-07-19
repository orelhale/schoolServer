
let {
   // student_updateOneStudent,
   // student_deleteOneStudent,
   // student_deleteManyStudent,
   // student_insertManyStudent,
   // student_updateManyStudent,
   create,
   find,
   findOne,
   updateOne,
   findById,
   deleteById,
} = require("../models/StudentsModel")



let createOneStudent = async (data) => {
   try {
      if (!data)
         throw ("Data is empty")
      return await create(data);
   } catch (error) {
      console.log("error = ", error);
      throw error
   }
}

let findOneStudent = async (condition, columns) => {
   try {
      if (!condition)
         throw ("Condition is null");

      return await findOne(condition, columns)
   } catch (error) {
      console.log("error = ", error);
      throw error
   }
}

let findStudent = async (condition = {}, columns) => {
   try {

      return await find(condition, columns)
   } catch (error) {
      console.log("error = ", error);
      throw error
   }
}

let findStudentById = async (studentId, columns) => {
   try {
      if (!studentId)
         throw ("studentId is null");

      let name = await findById(studentId, columns)
      console.log("name == ", name.nameStudent);
      return name.nameStudent
   } catch (error) {
      console.log("error = ", error);
      throw error
   }
}


module.exports = {
   findById,
   createOneStudent,
   findOneStudent,
   findStudentById,
   findStudent,
}
