
let { 
   create,
   find,
   findOne,
   updateOne,
   findById,
   deleteById,
} = require("../models/___Model")



let create___ = async (data) => {
   try {
      if (!data)
         throw ("Data is empty")
      return create___(data);
   } catch (error) {
      throw error
   }
}


let findAll___ = async (data) => {
   try {

      return find(data);
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

      return find___({ teacherId: teacherId, className: classId }, columns);
   } catch (error) {
      throw error
   }
}

let findOne___ = (condition, columns) => {
   try {
      if (!condition)
         throw ("Condition is null");

      return findOne___(condition, columns)
   } catch (error) {
      throw error
   }
}

let findOne___ById = async (id, columns) => {
   try {
      if (!id)
         throw ("Id is null");

      return findById(id, columns)
   } catch (error) {
      throw error
   }
}


let updataOne___ = async (id, columns) => {
   try {
      // console.log("___ id to delete = ", id);
      if (!id)
         throw ("Id is null");

      let existCheck = await findById(id);

      if (!existCheck)
         throw ("Not found id");

      return updateOne___({ _id: id }, columns);

   } catch (error) {
      throw error
   }
}


let delete___ = async (id) => {
   try {
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