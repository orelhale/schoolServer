let mongoose = require("mongoose")
const { Schema } = mongoose;


let schema = new Schema({
    teacherId: String,
    className: { type: String, required: true },
    date: String,
    examName: String,
    examList: Array,
    average: String,
})


let ProfessionModel = mongoose.model("professions", schema)


let create = (data) => {
    let newData = new ProfessionModel(data)
    return newData.save()
}

let find = (condition = {}, columns) => {
    return ProfessionModel.find(condition, columns);
}

let findById = (condition, columns) => {
    return ProfessionModel.findById(condition, columns);
}

let findOne = (condition, columns) => {
    return ProfessionModel.findOne(condition, columns);
}

let updateOne = (condition, update) => {
    return ProfessionModel.updateOne(condition, update);
}

let deleteById = (condition) => {
    return ProfessionModel.findByIdAndDelete(condition);
}


module.exports = {
    create,
    find,
    findOne,
    updateOne,
    findById,
    deleteById,
}
