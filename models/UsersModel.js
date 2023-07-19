let mongoose = require("mongoose")
const { Schema } = mongoose;


let schema = new Schema({
    name: String,
    family: String,
    email: String,
    password: String,
    nameSchool: String,
    Date: { type: Date, default: Date.now() },
    class_permission: { type: Array, default: [] },
    level_permission: { type: String, default: "Unauthorized" }
})


let UsersModel = mongoose.model("users", schema)

// אחרי שסיימתי להעביר את כל לפונקציות - אפשר למחוק את המשתנה הזה
exports.UsersModel = UsersModel


let users_createUser = (data) => {
    let newUser = new UsersModel(data)
    console.log("_users_createUser_ = ", newUser);
    return newUser.save()
}

let users_findUser = (condition, data) => {
    return UsersModel.find(condition, data);
}

let users_findOneUser = (condition, data) => {
    return UsersModel.findOne(condition, data);
}

let users_updateOneUser = (condition, update) => {
    return UsersModel.updateOne(condition, update);
}

let users_deleteOneUser = (condition) => {
    return UsersModel.deleteOne(condition);
}

let users_deleteManyUser = (condition) => {
    return UsersModel.deleteMany(condition);
}

exports.users_findUser = users_findUser
exports.users_findOneUser = users_findOneUser
exports.users_updateOneUser = users_updateOneUser
exports.users_createUser = users_createUser
exports.users_deleteOneUser = users_deleteOneUser
// module.exports = { users_findUser, users_findOneUser, users_updateOneUser, users_createUser, users_deleteOneUser }