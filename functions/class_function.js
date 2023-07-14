

let {
   classes_findClass,
   classes_findOneClass,
   classes_updateOneClass,
   classes_createClass,
   classes_findOneAndUpdateClass,
   classes_findByIdAndUpdateClass,
   classes_findByIdClass,
   classes_deleteOneClass,

   
   create,
   find,
   findOne,
   updateOne,
   findById,
   deleteById,

} = require("../models/ClassesModel")



let createOneClass = async (data) => {
   try {
      if (!data)
         throw ("Data is empty")
      return await classes_createClass(data);
   } catch (error) {
      throw error
   }
}


let findOneClass = async (condition, columns) => {
   try {
      if (!condition)
         throw ("Condition is null");

      return await classes_findOneClass(condition, columns)
   } catch (error) {
      throw error
   }
}


let findClassById = async (classId, columns) => {
   try {
      if (!classId)
         throw ("classId is null");
         
         let findClass = await findById(classId, columns)

         if (!findClass)
            throw ("class not exist");

      return findClass
   } catch (error) {
      throw error
   }
}


let findAll = async (columns) => {
   try {
      if (!classId)
         throw ("classId is null");

      return await find({}, columns)
   } catch (error) {
      throw error
   }
}

module.exports = { 
   createOneClass,
   findOneClass,
   findClassById,
   findAll,
}
