import userContent from "./api/v1/controllers/user/routes";
import postContent from "./api/v1/controllers/post/routes"
import commentContent from "./api/v1/controllers/comment/routes"
import likeContent from "./api/v1/controllers/like/routes"
export default function routes(app) {
    app.use("/api/v1/user", userContent);
    app.use("/api/v1/post", postContent);
    app.use("/api/v1/comment", commentContent);
    app.use("/api/v1/like", likeContent)
    return app;
}