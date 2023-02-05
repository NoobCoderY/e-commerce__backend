const express =require("express");

const router=express.Router();
const { registeruser, loginUser, logout } = require("../controllers/userController");
 router.route("/register").post(registeruser)
 router.route("/login").post(loginUser)
 router.route("/logout").post(logout)

 module.exports=router;