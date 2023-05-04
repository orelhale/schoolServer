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


let ExamsModel = mongoose.model("___", schema)



let ____createExam = (data) => {
    let newExam = new ExamsModel(data)
    return newExam.save()
}

let ____findExam = (condition, columns) => {
    return ExamsModel.find(condition, columns);
}

let ____findExamById = (condition, columns) => {
    return ExamsModel.findById(condition, columns);
}

let ____findOneExam = (condition, columns) => {
    return ExamsModel.findOne(condition, columns);
}

let ____updateOneExam = (condition, update) => {
    return ExamsModel.updateOne(condition, update);
}

let ____findByIdAndDelete = (condition) => {
    return ExamsModel.findByIdAndDelete(condition);
}


module.exports = {
    ____createExam,
    ____findExam,
    ____findOneExam,
    ____updateOneExam,
    ____findExamById,
    ____findByIdAndDelete,
}