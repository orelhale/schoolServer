
let { exams_createExam,
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
         throw ("Exam id is null");

      let existCheck = await exams_findExamById(id);

      if (!existCheck)
         throw ("Exam id not exist");

      return exams_findByIdAndDelete(id);

   } catch (error) {
      throw error
   }
}


module.exports = { deleteOneExam }