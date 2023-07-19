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


let create = (data) => {
    let newData = new ExamsModel(data)
    return newData.save()
}

let find = (condition = {}, columns) => {
    return ExamsModel.find(condition, columns);
}

let findById = (condition, columns) => {
    return ExamsModel.findById(condition, columns);
}

let findOne = (condition, columns) => {
    return ExamsModel.findOne(condition, columns);
}

let updateOne = (condition, update) => {
    return ExamsModel.updateOne(condition, update);
}

let deleteById = (condition) => {
    return ExamsModel.findByIdAndDelete(condition);
}




module.exports = {
    create,
    find,
    findOne,
    updateOne,
    findById,
    deleteById,
}