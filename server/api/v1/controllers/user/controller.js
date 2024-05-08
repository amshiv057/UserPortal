import Joi from "joi";
import apiError from "../../../../helper/apiError";
import responseMessage from "../../../../../assets/responseMessage";
import response from "../../../../../assets/response";
import { userServices } from "../../services/user";
const { createUser, findUser, updateUser } = userServices;
import { createHash, compareHash, getToken } from "../../../../helper/utils";
import status from "../../../../enums/status";


class userController {

    async createUser(req, res, next) {
        const validSchema = await Joi.object({
            email: Joi.string().required(),
            user_name: Joi.string().required(),
            password: Joi.string().required()
        });

        try {
            const { value } = validSchema.validate(req.body);
            const userResponse = await findUser({ user_name: value.user_name });
            if (userResponse) {
                throw apiError.alreadyExist(responseMessage.ALREADY_EXIST);
            }
            const hashedPassword = await createHash(value.password);
            value.password = hashedPassword
            const result = await createUser(value);
            return res.json(new response(result, responseMessage.USER_SIGNUP));
        } catch (error) {
            next(error);
        }
    }



    async loginUser(req, res, next) {
        const validSchema = await Joi.object({
            user_name: Joi.string().required(),
            password: Joi.string().required()
        });

        try {
            const { value } = validSchema.validate(req.body);
            const userResult = await findUser({ user_name: value.user_name });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_EXIST);
            }
            const isValidPassword = await compareHash(userResult.password, value.password);
            if (!isValidPassword) {
                throw apiError.invalid(responseMessage.INCORRECT_PASSWORD);
            }
            const token = await getToken({ _id: userResult._id, email: userResult.email });
            return res.json(new response({ userResult, token }, responseMessage.USER_LOGIN));
        } catch (error) {
            next(error);
        }
    }
    async forgetpassword(req, res, next) {
        const validSchema = await Joi.object({
            user_name: Joi.string().required(),
            new_password:Joi.string().required()
        });
        try {
            const { value } = validSchema.validate(req.body);
            const userResult = await findUser({ user_name: value.user_name });
            if (!userResult) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            const hashedPassword = await  createHash(value.new_password);

    
            const result = await updateUser({ _id: userResult._id },{password:hashedPassword});
            return res.json(new response(result, responseMessage.PASSWORD_UPDATE));
        } catch (error) {
            next(error);
        }
    }
}

export default new userController();