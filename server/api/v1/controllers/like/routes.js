import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";

export default Express.Router()
    .use(auth.verifyToken)
    .post('/createLike', controller.createLike)
    .get('/getLikes/:postId', controller.getLikesByPostId)
    .get('/totalLikes/:postId', controller.totalLikeOnPost)
    .delete('/deleteLike/:likeId', controller.deleteLike)
