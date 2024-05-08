import Joi from "joi";
import apiError from "../../../../helper/apiError";
import responseMessage from "../../../../../assets/responseMessage";
import response from "../../../../../assets/response";
import { userServices } from "../../services/user";
const { findUser } = userServices;
import postServices from "../../services/post";
const { createPost, findPost, findPostList, updatePost, deletePost } = postServices;



class PostController {

    async createPost(req, res, next) {
        const validSchema = await Joi.object({
            title: Joi.string().required(),
            desc: Joi.string().required(),
            image_url: Joi.string().required(),
        });

        try {

            const { value } = validSchema.validate(req.body);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const insertObj = {
                userId: userResult._id,
                image_url: value.image_url,
                desc: value.desc,
                title: value.title
            }
            const result = await createPost(insertObj);
            return res.json(new response(result, responseMessage.POST_CREATED));
        } catch (error) {
            next(error);
        }
    }

    async getPost(req, res, next) {
        const validSchema = await Joi.object({
            postId: Joi.string().required()
        });

        try {
            const { value } = validSchema.validate(req.params);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const result = await findPost({ _id: value.postId });
            if (!result) {
                throw apiError.notFound(responseMessage.POST_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.POST_FOUND));
        } catch (error) {
            next(error);
        }
    }

    async getPosts(req, res, next) {
        try {
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const result = await findPostList();
            if (!result) {
                throw apiError.notFound(responseMessage.POST_NOT_FOUND);
            }

            return res.json(new response(result, responseMessage.POST_FOUND));
        } catch (error) {
            next(error);
        }
    }

    async updatePost(req, res, next) {
        const validSchema = await Joi.object({
            postId: Joi.string().required(),
            title: Joi.string().required(),
            desc: Joi.string().required(),
            image_url: Joi.string().uri().allow('')
        });

        try {
            const { value } = validSchema.validate(req.body);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const postResult = await findPost({_id:value.postId});
            if (!postResult) {
                throw apiError.notFound(responseMessage.POST_NOT_FOUND);
            }
            const result = await updatePost({_id:value.postId}, value);
            return res.json(new response(result, responseMessage.POST_UPDATE));
        } catch (error) {
            next(error);
        }
    }

    async deletePost(req, res, next) {
        const validSchema = await Joi.object({
            postId: Joi.string().required()
        });

        try {
            const { value } = validSchema.validate(req.params);
            // console.log(value.postId)
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const postResult = await findPost({ _id:value.postId});
            // console.log(postResult)
            if (!postResult) {
                throw apiError.notFound(responseMessage.POST_NOT_FOUND);
            }
            const result = await deletePost(postResult._id);
            return res.json(new response(result, responseMessage.POST_DELETED));
        } catch (error) {
            next(error);
        }
    }
}

export default new PostController();
