import likeModel from "../../../models/like";

const likeServices = {
    createLike: async (insertObj) => {
        return likeModel.create(insertObj);
    },
    findLike: async (likeId) => {
        return likeModel.findOne(likeId).populate([{ path: 'userId', select: 'user_name' }, { path: 'postId', select: 'title desc' }]);
    },
    findLikesByPostId: async (postId) => {
        return likeModel.find({ postId: postId }).populate([{ path: 'userId', select: 'user_name' }, { path: 'postId', select: 'title desc' }]);
    },
    findLikesByUserId: async (userId) => {
        return likeModel.find({ userId: userId });
    },
    totalikeOnPost: async (postId) => {
        return likeModel.countDocuments(postId);
    },
    deleteLike: async (likeId) => {
        return likeModel.findByIdAndDelete(likeId);
    }
}

export default likeServices;
