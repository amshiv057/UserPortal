import Express from "express";
import controller from "./controller";
import validateEmail from "../../../../helper/validater";
export default Express.Router()
   
    .post("/signupUser",validateEmail, controller.createUser)
    .post("/loginUser",controller.loginUser)
    .post("/forgetPassword", controller.forgetpassword)