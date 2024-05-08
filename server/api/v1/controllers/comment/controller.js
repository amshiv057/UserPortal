import Joi from "joi";
import apiError from "../../../../helper/apiError";
import responseMessage from "../../../../../assets/responseMessage";
import response from "../../../../../assets/response";
import { userServices } from "../../services/user";
const { findUser } = userServices;
import postServices from "../../services/post";
const { findPost, } = postServices;
import commentServices from "../../services/comment";
const { createComment, findComment, findCommentsByPostId, updateComment, deleteComment } = commentServices;

class CommentController {

    async createComment(req, res, next) {
        const validSchema = await Joi.object({
            postId: Joi.string().required(),
            text: Joi.string().required(),
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
                postId: value.postId,
                text: value.text
            }
            const result = await createComment(insertObj);
            return res.json(new response(result, responseMessage.COMMENT_CREATED));
        } catch (error) {
            next(error);
        }
    }

    async getComment(req, res, next) {
        const validSchema = await Joi.object({
            commentId: Joi.string().required()
        });

        try {
            const { value } = validSchema.validate(req.params);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const result = await findComment({ _id: value.commentId });
            if (!result) {
                throw apiError.notFound(responseMessage.COMMENT_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.COMMENT_FOUND));
        } catch (error) {
            next(error);
        }
    }

    async getCommentsByPostId(req, res, next) {
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
            const result = await findCommentsByPostId(postResult._id);
            if (!result) {
                throw apiError.notFound(responseMessage.COMMENT_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.COMMENT_FOUND));
        } catch (error) {
            next(error);
        }
    }

    async updateComment(req, res, next) {
        const validSchema = await Joi.object({
            commentId: Joi.string().required(),
            text: Joi.string().required(),
        });

        try {
            const { value } = validSchema.validate(req.body);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const commentResult = await findComment({ _id: value.commentId });
            if (!commentResult) {
                throw apiError.notFound(responseMessage.COMMENT_NOT_FOUND);
            }
            const result = await updateComment({ _id: value.commentId }, value);
            return res.json(new response(result, responseMessage.COMMENT_UPDATED));
        } catch (error) {
            next(error);
        }
    }

    async deleteComment(req, res, next) {
        const validSchema = await Joi.object({
            commentId: Joi.string().required()
        });

        try {
            const { value } = validSchema.validate(req.params);
            const userResult = await findUser({ _id: req.userId });
            if (!userResult) {
                throw apiError.notFound(responseMessage.UNAUTH);
            }
            const commentResult = await findComment({ _id: value.commentId });
            if (!commentResult) {
                throw apiError.notFound(responseMessage.COMMENT_NOT_FOUND);
            }
            const result = await deleteComment(value.commentId);
            return res.json(new response(result, responseMessage.COMMENT_DELETED));
        } catch (error) {
            next(error);
        }
    }
}

export default new CommentController();
