import mongoose from "mongoose";

const timeStamps = {
    timestamps: true,
    collection: 'like'
}

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'post',
        required: true,
    },
}, timeStamps);

module.exports = mongoose.model('like', likeSchema)