
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

      // console.log("data == ", data);
      
      let { teacherId, classId, month, dailyDataList } = data

      let findDailydatasByMonth = await findOneDailydatasBy_TeacherIdClassId_Month({ teacherId, classId, month })
      
      if(findDailydatasByMonth){
         let day = dailyDataList[0].day
         // console.log("findDailydatasByMonth == ",findDailydatasByMonth);
         let findIndexDay = findDailydatasByMonth.dailyDataList.findIndex( d => d.day == day)
         // console.log("findIndexDay == ",findIndexDay);
         if(findIndexDay >= 0){
            findDailydatasByMonth.dailyDataList[findIndexDay] = dailyDataList[0]
            console.log("updateOne 111");
            return await updateOne({_id :findDailydatasByMonth._id}, {dailyDataList: findDailydatasByMonth.dailyDataList})
         }else{
            findDailydatasByMonth.dailyDataList.push(dailyDataList[0])
            console.log("updateOne 222");
            return await updateOne({_id :findDailydatasByMonth._id}, {dailyDataList: findDailydatasByMonth.dailyDataList})
         }
      }

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

      return find({ teacherId: teacherId, classId: classId }, columns);
   } catch (error) {
      throw error
   }
}

let findDailydatasBySpecificCondition = async (condition, columns) => {
   try {
      if (!condition)
         throw ("condition is empty");

      let id = await findOne(condition, columns);
      // console.log("id == ",id);
      // let obj = id ? await findById(id._id) : id

      return id
   } catch (error) {
      throw error
   }
}

let findDailydatas = (condition = {}, columns) => {
   try {

      return find(condition, columns)
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



let findOneDailydatasBy_TeacherIdClassId_Month = async ({ teacherId, classId, month }, columns) => {
   try {

      if (!teacherId || !classId || !month)
         throw ("teacherId || classId || month is null");
      // console.log("{ teacherId, classId, month } == ",{ teacherId, classId, month });
     
      return findOne({ teacherId, classId, month }, columns);

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
   findDailydatas,
   findOneDailydatasById,
   findAllDailydatas,
   findDailydatasBySpecificCondition,
}
