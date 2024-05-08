import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";

export default Express.Router()
    .use(auth.verifyToken)
    .post("/createComment", controller.createComment)
    .get('/getComment/:commentId', controller.getComment)
    .get('/getCommentList/:postId', controller.getCommentsByPostId)
    .post('/updateComment', controller.updateComment)
    .delete('/deleteComment/:commentId', controller.deleteComment)


