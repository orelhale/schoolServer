
let {
   create,
   find,
   findOne,
   findById,
   updateOne,
   deleteById,
} = require("../models/ProfessionModel")


let createProfession = async (data) => {
   try {
      if (!data)
         throw ("Data is null");

      return await create(data)
   } catch (error) {
      throw error
   }
}

let findAllProfession = async (data) => {
   try {
      return await find(data)
   } catch (error) {
      throw error
   }
}


let findOneProfession = async (condition, columns) => {
   try {
      if (!condition)
      throw ("Condition is null");
      
      return await findOne(condition, columns)
   } catch (error) {
      throw error
   }
}

let updataOneProfession = async (id, columns) => {
   try {
      // console.log("___ id to delete = ", id);
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


let deleteProfession = async (id) => {
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


// let Profession = async (id, data) => {
//    try {
//       if (!id)
//          throw ("Id is null");
//       return
//    } catch (error) {
//       throw error
//    }
// }


module.exports = {
   findAllProfession,
   createProfession,
   updataOneProfession,
   deleteProfession,
   findOneProfession,
}