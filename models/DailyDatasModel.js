let mongoose = require("mongoose")
const { Schema } = mongoose;


let schema = new Schema({
    teacherId: String,
    classId: String,
    professionId: String,
    year: Number,
    dailyDataList: [{day: Number, list: [{studentId: String, attendance: String}]}],
    month: Number,
})


let DailyDatasModel = mongoose.model("dailydatas", schema)

// אחרי שסיימתי להעביר את כל לפונקציות - אפשר למחוק את המשתנה הזה
exports.DailyDatasModel = DailyDatasModel;


let dailyDatas_createDailyData = (data) => {
    let newDailyData = new DailyDatasModel(data)
    console.log("dDailyDatas_createDailyData_ = ", newDailyData);
    return newDailyData.save()
}

let dailyDatas_findDailyData = (condition, data) => {
    return DailyDatasModel.find(condition, data);
}

let dailyDatas_findOneDailyData = (condition, data) => {
    return DailyDatasModel.findOne(condition, data);
}

let dailyDatas_updateOneDailyData = (condition, update) => {
    return DailyDatasModel.updateOne(condition, update);
}

let dailyDatas_deleteOneDailyData = (condition) => {
    return DailyDatasModel.deleteOne(condition);
}

let dailyDatas_deleteManyDailyData = (condition) => {
    return DailyDatasModel.deleteMany(condition);
}


exports.dailyDatas_findDailyData = dailyDatas_findDailyData
exports.dailyDatas_findOneDailyData = dailyDatas_findOneDailyData
exports.dailyDatas_updateOneDailyData = dailyDatas_updateOneDailyData
exports.dailyDatas_createDailyData = dailyDatas_createDailyData
// module.exports = { dailyDatas_findDailyData, dailyDatas_findOneDailyData, dailyDatas_updateOneDailyData, dailyDatas_createDailyData }


let create = (data) => {
    let newData = new DailyDatasModel(data)
    return newData.save()
}

let find = (condition = {}, columns) => {
    return DailyDatasModel.find(condition, columns);
}

let findById = (condition, columns) => {
    return DailyDatasModel.findById(condition, columns);
}

let findOne = (condition, columns) => {
    return DailyDatasModel.findOne(condition, columns);
}

let updateOne = (condition, update) => {
    return DailyDatasModel.updateOne(condition, update);
}

let deleteById = (condition) => {
    return DailyDatasModel.findByIdAndDelete(condition);
}

// module.exports = {
//     create,
//     find,
//     findOne,
//     updateOne,
//     findById,
//     deleteById,
// }

exports.create = create
exports.find = find
exports.findOne = findOne
exports.updateOne = updateOne
exports.findById = findById
exports.deleteById = deleteById


