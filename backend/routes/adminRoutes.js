import express from "express";
import {adminSignIn,adminSignUp,adminLogOut,deleteUser,addUser} from "../controllers/adminCon.js";
import {addCourse,deleteCourse} from "../controllers/adminCon.js";
import authorizeRoles from "../middleware/authorization.js";
import adminCheck from "../middleware/adminCheck.js";
import { oldLogOut,clearCookie } from "../controllers/adminCon.js";

const router=express.Router()

//Admin routes
router.route("/register/").post(clearCookie,adminSignUp)
router.route("/login/").post(oldLogOut,adminSignIn)
router.route("/logout/").get(adminLogOut)

router.route("/add/").post(adminCheck,authorizeRoles("admin"),addCourse)
router.route("/delete/:id").delete(adminCheck,authorizeRoles("admin"),deleteCourse)
router.route("/delete/user/:id").delete(adminCheck,authorizeRoles("admin"),deleteUser)
router.route("/add/user").post(adminCheck,authorizeRoles("admin"),addUser)

export default router;