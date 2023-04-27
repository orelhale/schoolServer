let mongoose = require("mongoose")
const { Schema } = mongoose;


let schema = new Schema({
    teacherId: String,
    className: String,
    date: String,
    examName: String,
    examList: Array,
    average: String,
})


let ExamsModel = mongoose.model("exams", schema)

// אחרי שסיימתי להעביר את כל לפונקציות - אפשר למחוק את המשתנה הזה
exports.ExamsModel = ExamsModel;


let exams_createExam = (data) => {
    let newExam = new ExamsModel(data)
    console.log("_exams_createExam_ = ", newExam);
    return newExam.save()
}

let exams_findExam = (condition, data) => {
    return ExamsModel.find(condition, data);
}

let exams_findOneExam = (condition, data) => {
    return ExamsModel.findOne(condition, data);
}

let exams_updateOneExam = (condition, update) => {
    return ExamsModel.updateOne(condition, update);
}

let exams_deleteOneExam = (condition) => {
    return ExamsModel.deleteOne(condition);
}

let exams_deleteManyExam = (condition) => {
    return ExamsModel.deleteMany(condition);
}

exports.exams_findExam = exams_findExam
exports.exams_findOneExam = exams_findOneExam
exports.exams_updateOneExam = exams_updateOneExam
exports.exams_createExam = exams_createExam
// module.exports = { exams_findExam, exams_findOneExam, exams_updateOneExam, exams_createExam }