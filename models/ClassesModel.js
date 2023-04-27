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


let classes_createClass = (data) => {
    let newClass = new ClassesModel(data)
    console.log("_classes_createClass_ = ", newClass);
    return newClass.save()
}

let classes_findClass = (condition, data) => {
    return ClassesModel.find(condition, data);
}

let classes_findOneClass = (condition, data) => {
    return ClassesModel.findOne(condition, data);
}

let classes_updateOneClass = (condition, update) => {
    return ClassesModel.updateOne(condition, update);
}

let classes_deleteOneClass = (condition) => {
    return ClassesModel.deleteOne(condition);
}

let classes_deleteManyClass = (condition) => {
    return ClassesModel.deleteMany(condition);
}

exports.classes_findClass = classes_findClass
exports.classes_findOneClass = classes_findOneClass
exports.classes_updateOneClass = classes_updateOneClass
exports.classes_createClass = classes_createClass
// module.exports = { classes_findClass, classes_findOneClass, classes_updateOneClass, classes_createClass }
