import jwt from "jsonwebtoken";
import userModel from "../models/user";
import apiError from "./apiError";
import responseMessage from "../../assets/responseMessage";
require("../../config/config");

module.exports = {
    async verifyToken(req, res, next) {
        if (req.headers.token) {
            jwt.verify(req.headers.token, global.gConfig.jwtsecret, async (err, result) => {
                if (err) {
                    throw apiError.unauthorized();
                }
                else {
                    const userReslt = await userModel.findOne({ _id: result._id });
                    if (!userReslt) {
                        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
                    }
                    else {
                        req.userId = result._id;
                        req.userDetails = result;
                        next();
                    }
        }
    })
}
        else {
    throw apiError.badRequest(responseMessage.NO_TOKEN)
}
    }
    
}