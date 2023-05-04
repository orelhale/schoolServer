
let { 
   model_create___,
   model_findByIdAndDelete,
   model_find___ById,
   model_updateOne___,
   model_findOne___,
   model_find___,
} = require("../models/___Model")




let deleteOne___ = async (id) => {
   try {
      if (!id)
         throw ("Id is null");

      let existCheck = await model_find___ById(id);

      if (!existCheck)
         throw ("Not found id");

      return model_findByIdAndDelete(id);

   } catch (error) {
      throw error
   }
}


let updataOne___ = async (id, columns) => {
   try {
      // console.log("___ id to delete = ", id);
      if (!id)
         throw ("Id is null");

      let existCheck = await model_find___ById(id);

      if (!existCheck)
         throw ("Not found id");

      return model_updateOne___({ _id: id }, columns);

   } catch (error) {
      throw error
   }
}


let createOne___ = async (data) => {
   try {
      if (!data)
         throw ("Data is empty")
      return model_create___(data);
   } catch (error) {
      throw error
   }
}


let find___ByTeacherIdAndClassId = (teacherId, classId, columns) => {
   try {
      if (!teacherId)
         throw ("TeacherId is null");

      if (!classId)
         throw ("ClassId is null");

      return model_find___({ teacherId: teacherId, className: classId }, columns);
   } catch (error) {
      throw error
   }
}

let findOne___ = (condition, columns) => {
   try {
      if (!condition)
         throw ("Condition is null");

      return model_findOne___(condition, columns)
   } catch (error) {
      throw error
   }
}

let findOne___ById = async (id, columns) => {
   try {
      if (!id)
         throw ("Id is null");

      return model_find___ById(id, columns)
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
   deleteOne___,
   updataOne___,
   createOne___,
   find___ByTeacherIdAndClassId,
   findOne___,
   findOne___ById,
}