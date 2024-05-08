import postModel from "../../../models/post";

const postServices = {
    createPost: async (insertObj) => {
        return postModel.create(insertObj);
    },
    findPost: async (postId) => {
        return postModel.findOne(postId).populate({ path: 'userId', select: 'user_name' });
    },
    findPostList: async (query = {}) => {
        return postModel.find(query).populate({ path: 'userId', select: 'user_name' }).sort({ createdAt: -1 });;
    },
    updatePost: async (postId, updateObj) => {
        return postModel.updateOne(postId, updateObj, { new: true });
    },
    deletePost: async (postId) => {
        // console.log(">>>>>>>", postId);
        return postModel.findByIdAndDelete(postId);
    }
}

export default postServices;
