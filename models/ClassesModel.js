let mongoose = require("mongoose")
const { Schema } = mongoose;


let schema = new Schema({
    nameOfClass: String,
    listStudents: { type: Array, default: [] },
    nameOfSchool: String,
})


ClassesModel = mongoose.model("classes", schema)

// אחרי שסיימתי להעביר את כל לפונקציות - אפשר למחוק את המשתנה הזה
exports.ClassesModel = ClassesModel;


let classes_createClass = async (data) => {
    let newClass = await new ClassesModel(data)
    console.log("_classes_createClass_ = ", newClass);
    return await newClass.save()
}

let classes_findClass = (condition, data) => {
    return ClassesModel.find(condition, data);
}

let classes_findOneClass = (condition, data) => {
    return ClassesModel.findOne(condition, data);
}

// לבדוק אולי מיותר
let classes_findByIdClass = (condition, data) => {
    return ClassesModel.findById(condition, data);
}

// לבדוק אולי מיותר
let classes_findByIdAndUpdateClass = (condition, update) => {
    return ClassesModel.findByIdAndUpdate(condition, update);
}

let classes_updateOneClass = (condition, update) => {
    return ClassesModel.updateOne(condition, update);
}

// לבדוק אולי מיותר
let classes_findOneAndUpdateClass = (condition, update) => {
    return ClassesModel.findOneAndUpdate(condition, update);
}

let classes_deleteOneClass = (condition) => {
    return ClassesModel.deleteOne(condition);
}

let classes_deleteManyClass = (condition) => {
    return ClassesModel.deleteMany(condition);
}



let create = (data) => {
    let newData = new ClassesModel(data)
    return newData.save()
}

let find = (condition = {}, columns) => {
    return ClassesModel.find(condition, columns);
}

let findById = (condition, columns = '') => {
    return ClassesModel.findById(condition, columns);
}

let findOne = (condition, columns) => {
    return ClassesModel.findOne(condition, columns);
}

let updateOne = (condition, update) => {
    return ClassesModel.updateOne(condition, update);
}

let deleteById = (condition) => {
    return ClassesModel.findByIdAndDelete(condition);
}

// exports.classes_findClass = classes_findClass
// exports.classes_findOneClass = classes_findOneClass
// exports.classes_updateOneClass = classes_updateOneClass
// exports.classes_createClass = classes_createClass


module.exports = {
    classes_findClass,
    classes_findOneClass,
    classes_updateOneClass,
    classes_createClass,
    classes_findOneAndUpdateClass,
    classes_findByIdAndUpdateClass,
    classes_findByIdClass,
    classes_deleteOneClass,


    create,
    find,
    findOne,
    updateOne,
    findById,
    deleteById,
}
