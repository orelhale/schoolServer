
let { 
   create,
   find,
   findOne,
   updateOne,
   findById,
   deleteById,
} = require("../models/DailyDatasModel")



let createDailydatas = async (data) => {
   try {
      if (!data)
         throw ("Data is empty")
      return create(data);
   } catch (error) {
      throw error
   }
}


let findAllDailydatas = async (data) => {
   try {

      return find(data);
   } catch (error) {
      throw error
   }
}

let findDailydatasByTeacherIdAndClassId = (teacherId, classId, columns) => {
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

let findDailydatasBySpecificCondition = async (condition, columns) => {
   try {
      if (!condition)
         throw ("condition is empty");

      let id = await findOne(condition, columns);
      let obj = id ? await findById(id._id) : id

      return obj
   } catch (error) {
      throw error
   }
}

let findOneDailydatas = (condition, columns) => {
   try {
      if (!condition)
         throw ("Condition is null");

      return findOne(condition, columns)
   } catch (error) {
      throw error
   }
}

let findOneDailydatasById = async (id, columns) => {
   try {
      if (!id)
         throw ("Id is null");

      return findById(id, columns)
   } catch (error) {
      throw error
   }
}


let updataOneDailydatas = async (id, updata) => {
   try {
      // console.log("Dailydatas id to delete = ", id);
      if (!id)
         throw ("Id is null");

      let existCheck = await findById(id);

      if (!existCheck)
         throw ("Not found id");

      return updateOne({ _id: id }, updata);

   } catch (error) {
      throw error
   }
}


let deleteDailydatas = async (id) => {
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
   deleteDailydatas,
   updataOneDailydatas,
   createDailydatas,
   findDailydatasByTeacherIdAndClassId,
   findOneDailydatas,
   findOneDailydatasById,
   findAllDailydatas,
   findDailydatasBySpecificCondition,
}