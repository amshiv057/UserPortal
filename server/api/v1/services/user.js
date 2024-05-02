import userModel from "../../../models/user";


const userServices = {
    createUser: async (insertObj) => {
        return await userModel.create(insertObj);
    },
    findUser: async (query) => {
        return await userModel.findOne(query);
    },
    updateUser: async (query, obj) => {
        return await userModel.findOneAndUpdate(query, obj, { new: true });
    },
   
}


module.exports = { userServices };