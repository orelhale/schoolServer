

let {
   classes_findClass,
   classes_findOneClass,
   classes_updateOneClass,
   classes_createClass,
   classes_findOneAndUpdateClass,
   classes_findByIdAndUpdateClass,
   classes_findByIdClass,
   classes_deleteOneClass
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

module.exports = { createOneClass, findOneClass }
