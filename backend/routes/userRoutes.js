import express from "express";
import {signUp,signIn,getCourses,applyCourse,
    logOut,oldLogOut,registeredCourses,clearCookie} from "../controllers/userCon.js";
import userCheck from "../middleware/userCheck.js";

const router=express.Router()

//For users
router.route("/register/").post(clearCookie,signUp)
router.route("/login/").post(oldLogOut,signIn)
router.route("/logout/").get(logOut)

//To be protected routes
router.route("/get/").get(userCheck,getCourses)
router.route("/apply/:id").put(userCheck,applyCourse)
router.route("/show/").get(registeredCourses)

export default router;