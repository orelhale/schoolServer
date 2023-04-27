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


let Student_findStudent = (condition, data) => {
    return StudentsModel.find(condition, data);
}

let Student_findOneStudent = (condition, data) => {
    return StudentsModel.findOne(condition, data);
}

let Student_updateOneStudent = (condition, update) => {
    return StudentsModel.updateOne(condition, update);
}

let Student_deleteOneStudent = (condition) => {
    return StudentsModel.deleteOne(condition);
}

let Student_deleteManyStudent = (condition) => {
    return StudentsModel.deleteMany(condition);
}


exports.Student_findStudent = Student_findStudent;
exports.Student_findOneStudent = Student_findOneStudent;
exports.Student_updateOneStudent = Student_updateOneStudent;
// module.exports = { Student_findStudent, Student_findOneStudent, Student_updateOneStudent }