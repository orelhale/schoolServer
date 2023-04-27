let mongoose = require("mongoose")
const { Schema } = mongoose;


let schema = new Schema({
    nameStudent: String,
    nameOfClass: String,
    identify: String,
    schoolName: String,
    classId: String,
})


let StudentsModel = mongoose.model("students", schema);

// אחרי שסיימתי להעביר את כל לפונקציות - אפשר למחוק את המשתנה הזה
exports.StudentsModel = StudentsModel;


let student_findStudent = (condition, data) => {
    return StudentsModel.find(condition, data);
}

let student_findOneStudent = (condition, data) => {
    return StudentsModel.findOne(condition, data);
}

let student_updateOneStudent = (condition, update) => {
    return StudentsModel.updateOne(condition, update);
}

let student_deleteOneStudent = (condition) => {
    return StudentsModel.deleteOne(condition);
}

let student_deleteManyStudent = (condition) => {
    return StudentsModel.deleteMany(condition);
}

let student_insertManyStudent = (condition) => {
    return StudentsModel.insertMany(condition);
}

let student_updateManyStudent = (condition) => {
    return StudentsModel.updateMany(condition);
}


// exports.student_findStudent = student_findStudent;
// exports.student_findOneStudent = student_findOneStudent;
// exports.student_updateOneStudent = student_updateOneStudent;
// exports.student_deleteOneStudent = student_deleteOneStudent;
// exports.student_deleteManyStudent = student_deleteManyStudent;
// exports.student_insertManyStudent = student_insertManyStudent;
// exports.student_updateManyStudent = student_updateManyStudent;

module.exports = {
    student_findStudent,
    student_findOneStudent,
    student_updateOneStudent,
    student_deleteOneStudent,
    student_deleteManyStudent,
    student_insertManyStudent,
    student_updateManyStudent,
}
