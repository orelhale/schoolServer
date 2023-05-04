
let { 
   exams_createExam,
   exams_findByIdAndDelete,
   exams_findExamById,
   exams_updateOneExam,
   exams_findOneExam,
   exams_findExam,
} = require("../models/ExamsModel")




let deleteOneExam = async (id) => {
   try {
      // console.log("Exam id to delete = ", id);
      if (!id)
         throw ("Id is null");

      let existCheck = await exams_findExamById(id);

      if (!existCheck)
         throw ("Not found id");

      return exams_findByIdAndDelete(id);

   } catch (error) {
      throw error
   }
}


let updataOneExam = async (id, columns) => {
   try {
      // console.log("Exam id to delete = ", id);
      if (!id)
         throw ("Id is null");

      let existCheck = await exams_findExamById(id);

      if (!existCheck)
         throw ("Not found id");

      return exams_updateOneExam({ _id: id }, columns);

   } catch (error) {
      throw error
   }
}


let createOneExam = async (data) => {
   try {
      if (!data)
         throw ("Data is empty")
      return exams_createExam(data);
   } catch (error) {
      throw error
   }
}


let findExamsByTeacherIdAndClassId = (teacherId, classId, columns) => {
   try {
      if (!teacherId)
         throw ("TeacherId is null");

      if (!classId)
         throw ("ClassId is null");

      return exams_findExam({ teacherId: teacherId, className: classId }, columns);
   } catch (error) {
      throw error
   }
}

let findOneExam = (condition, columns) => {
   try {
      if (!condition)
         throw ("Condition is null");

      return exams_findOneExam(condition, columns)
   } catch (error) {
      throw error
   }
}

let findOneExamById = async (id, columns) => {
   try {
      if (!id)
         throw ("Id is null");

      return exams_findExamById(id, columns)
   } catch (error) {
      throw error
   }
}

// let find = async (id, data) => {
//    try {
//       if (!id)
//          throw ("Id is null");
//       return
//    } catch (error) {
//       throw error
//    }
// }


module.exports = {
   deleteOneExam,
   updataOneExam,
   createOneExam,
   findExamsByTeacherIdAndClassId,
   findOneExam,
   findOneExamById,
}