
let { 
   create,
   find,
   findOne,
   updateOne,
   findById,
   deleteById,
} = require("../models/ExamsModel")




let deleteOneExam = async (id) => {
   try {
      // console.log("Exam id to delete = ", id);
      if (!id)
         throw ("Id is null");

      let existCheck = await findById(id);

      if (!existCheck)
         throw ("Not found id");

      return deleteById(id);

   } catch (error) {
      throw error
   }
}


let updataOneExam = async (id, columns) => {
   try {
      // console.log("Exam id to delete = ", id);
      if (!id)
         throw ("Id is null");

      let existCheck = await findById(id);

      if (!existCheck)
         throw ("Not found id");

      return updateOne({ _id: id }, columns);

   } catch (error) {
      throw error
   }
}


let createOneExam = async (data) => {
   try {
      if (!data)
         throw ("Data is empty")
      return create(data);
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

      return find({ teacherId: teacherId, className: classId }, columns);
   } catch (error) {
      throw error
   }
}

let findExam = (condition = {}, columns) => {
   try {

      return find(condition, columns)
   } catch (error) {
      throw error
   }
}

let findOneExam = (condition, columns) => {
   try {
      if (!condition)
         throw ("Condition is null");

      return findOne(condition, columns)
   } catch (error) {
      throw error
   }
}

let findOneExamById = async (id, columns) => {
   try {
      if (!id)
         throw ("Id is null");

      return findById(id, columns)
   } catch (error) {
      throw error
   }
}

let getStudentTestAverage = async () => {
   try {
      if (!id)
         throw ("Id is null");

      return findById(id, columns)
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
   findExam,
   findOneExamById,
}