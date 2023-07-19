let mongoose = require("mongoose")
const { Schema } = mongoose;


let schema = new Schema({
    nameStudent: String,
    family: String,
    haddress: String,
    phone: String,
    nameOfClass: String,
    is_active: { type: Boolean, default: true },
    identify: String,
    schoolName: String,
    classId: String,
})


let StudentsModel = mongoose.model("students", schema);

// אחרי שסיימתי להעביר את כל לפונקציות - אפשר למחוק את המשתנה הזה
exports.StudentsModel = StudentsModel;

let create = (data) => {
    let newData = new StudentsModel(data)
        console.log("_StudentsModel_create_ = ", newData);
    return newData.save()
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
    console.log("student_insertManyStudent__ === ",condition);
    return StudentsModel.insertMany(condition);
}

let student_updateManyStudent = (condition) => {
    return StudentsModel.updateMany(condition);
}


// exports.student_findOneStudent = student_findOneStudent;
// exports.student_updateOneStudent = student_updateOneStudent;
// exports.student_deleteOneStudent = student_deleteOneStudent;
// exports.student_deleteManyStudent = student_deleteManyStudent;
// exports.student_insertManyStudent = student_insertManyStudent;
// exports.student_updateManyStudent = student_updateManyStudent;



let find = (condition = {}, columns) => {
    return StudentsModel.find(condition, columns);
}

let findById = (condition, columns) => {
    return StudentsModel.findById(condition, columns);
}

let findOne = (condition, columns) => {
    return StudentsModel.findOne(condition, columns);
}

let updateOne = (condition, update) => {
    return StudentsModel.updateOne(condition, update);
}

let deleteById = (condition) => {
    return StudentsModel.findByIdAndDelete(condition);
}


module.exports = {
    create,
    student_findOneStudent,
    student_updateOneStudent,
    student_deleteOneStudent,
    student_deleteManyStudent,
    student_insertManyStudent,
    student_updateManyStudent,

    find,
    findOne,
    updateOne,
    findById,
    deleteById,
}