import Joi from "joi";
import apiError from "../../../../helper/apiError";
import responseMessage from "../../../../../assets/responseMessage";
import response from "../../../../../assets/response";
import { userServices } from "../../services/user";
const { findUser } = userServices;
import postServices from "../../services/post";
const { findPost } = postServices;
import likeServices from "../../services/like";
const { createLike, deleteLike, findLike, findLikesByPostId, totalikeOnPost } = likeServices;

class LikeController {

    async createLike(req, res, next) {
        const validSchema = await Joi.object({
            postId: Joi.string().required(),
        });

        try {
            const { value } = validSchema.validate(req.body);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const postResult = await findPost({ _id: value.postId });
            if (!postResult) {
                throw apiError.notFound(responseMessage.POST_NOT_FOUND);
            }
            const insertObj = {
                userId: userResult._id,
                postId: value.postId
            }
            const result = await createLike(insertObj);
            return res.json(new response(result, responseMessage.LIKE_CREATED));
        } catch (error) {
            next(error);
        }
    }

    async deleteLike(req, res, next) {
        const validSchema = await Joi.object({
            likeId: Joi.string().required()
        });

        try {
            const { value } = validSchema.validate(req.params);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const likeResult = await findLike({ _id: value.likeId });
            if (!likeResult) {
                throw apiError.notFound(responseMessage.LIKE_NOT_FOUND)
            }
            const result = await deleteLike(value.likeId);
            return res.json(new response(result, responseMessage.LIKE_DELETED));
        } catch (error) {
            next(error);
        }
    }

    async getLikesByPostId(req, res, next) {
        const validSchema = await Joi.object({
            postId: Joi.string().required()
        });

        try {
            const { value } = validSchema.validate(req.params);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const postResult = await findPost({ _id: value.postId });
            if (!postResult) {
                throw apiError.notFound(responseMessage.POST_NOT_FOUND);
            }
            const result = await findLikesByPostId(postResult._id);
            if (!result) {
                throw apiError.notFound(responseMessage.LIKE_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.LIKE_FOUND));
        } catch (error) {
            next(error);
        }
    }
    async totalLikeOnPost(req, res, next) {
        const validSchema = await Joi.object({
            postId: Joi.string().required()
        });

        try {
            const { value } = validSchema.validate(req.params);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const postResult = await findPost({ _id: value.postId });
            if (!postResult) {
                throw apiError.notFound(responseMessage.POST_NOT_FOUND);
            }
            const totalLikes = await totalikeOnPost(value.postId);
            if (!totalLikes) {
                throw apiError.notFound(responseMessage.LIKE_NOT_FOUND);
            }
            return res.json(new response({ totalLikes }, responseMessage.LIKE_COUNT_FOUND));
        } catch (error) {
            next(error);
        }
    }

}

export default new LikeController();
