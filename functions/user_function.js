let {
   users_findUser, users_findOneUser, users_updateOneUser, users_createUser, users_deleteOneUser
} = require("../models/UsersModel")


let createOneUser = async (data) => {
   try {
      if (!data)
         throw ("Data is empty")
      return await users_createUser(data);
   } catch (error) {
      throw error
   }
}


let findOneUser = async (condition, columns) => {
   try {
      if (!condition)
         throw ("Condition is null");

      return await users_findOneUser(condition, columns)
   } catch (error) {
      throw error
   }
}

module.exports = { createOneUser, findOneUser }