import mongoose from "mongoose";

const timeStamps = {
    timestamps: true,
    collection: 'comment'
};

const commentSchema = new mongoose.Schema({
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
    text: {
        type: String,
        required: true,
        trim: true,
    }

},timeStamps);


module.exports = mongoose.model('comment',commentSchema);