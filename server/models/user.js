import mongoose from "mongoose";
const timeStamps = {
    timestamps: true,
    collection: "user"
}


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true
    },
    user_name: {
        type: String,
        trim: true
    },
    password: {
        type: String
    },
},timeStamps);

module.exports = mongoose.model('user',userSchema);