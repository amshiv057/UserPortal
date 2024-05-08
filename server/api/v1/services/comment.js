
import Comment from "../../../models/comment"; 

const commentServices = {
    createComment: async (insertObj) => {
        return Comment.create(insertObj);
    },
    findComment: async (commentId) => {
        return Comment.findOne(commentId).populate([{ path: 'userId', select: 'user_name' }, { path: 'postId', select: 'title desc' }]);;
    },
    findCommentsByPostId: async (postId) => {
        return Comment.find({ postId: postId }).populate([{ path: 'userId', select: 'user_name' }, { path: 'postId', select: 'title desc' }]).sort({ createdAt: -1 });
    },
    findCommentsByUserId: async (userId) => {
        return Comment.find({ userId: userId });
    },
    updateComment: async (commentId, updateObj) => {
        return Comment.updateOne(commentId, updateObj, { new: true });
    },
    deleteComment: async (commentId) => {
        return Comment.findByIdAndDelete(commentId);
    }
}

export default commentServices;
