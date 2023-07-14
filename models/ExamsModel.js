let mongoose = require("mongoose")
const { Schema } = mongoose;


let schema = new Schema({
    teacherId: String,
    className: String,
    date: String,
    examName: String,
    examList: Array,
    average: Number,
})


let ExamsModel = mongoose.model("exams", schema)

exports.ExamsModel = ExamsModel;


let exams_createExam = (data) => {
    let newExam = new ExamsModel(data)
    return newExam.save()
}

let exams_findExam = (condition, columns) => {
    return ExamsModel.find(condition, columns);
}

let exams_findExamById = (condition, columns) => {
    return ExamsModel.findById(condition, columns);
}

let exams_findOneExam = (condition, columns) => {
    return ExamsModel.findOne(condition, columns);
}

let exams_updateOneExam = (condition, update) => {
    return ExamsModel.updateOne(condition, update);
}

let exams_findByIdAndDelete = (condition) => {
    return ExamsModel.findByIdAndDelete(condition);
}


module.exports = {
    exams_createExam,
    exams_findExam,
    exams_findOneExam,
    exams_updateOneExam,
    exams_findExamById,
    exams_findByIdAndDelete,
}