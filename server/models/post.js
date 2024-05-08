import mongoose from "mongoose";
const timeStamps = {
    timestamps: true,
    collection: 'post'
}
const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    imgage_url: {
        type: String,
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    like: [{
        type: mongoose.Types.ObjectId,
        ref: 'like'
    }],
    comment: [{
        type: mongoose.Types.ObjectId,
        ref: 'comment'
    }]
}, timeStamps)

module.exports = mongoose.model('post', PostSchema)