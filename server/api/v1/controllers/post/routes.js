import Express from "express";
import controller from "./controller";
import auth from "../../../../helper/auth";

export default Express.Router()
    .use(auth.verifyToken)
    .post("/createPost", controller.createPost)
    .get("/getPost/:postId", controller.getPost)
    .get("/getPostList", controller.getPosts)
    .post("/updatePost", controller.updatePost)
    .delete("/deletePost/:postId", controller.deletePost)