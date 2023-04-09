const {
    login,
    signup,
    getUserById, 
    forgotPassword,
    resetPassword
}= require("../controllers/User.Controller");
const uploadImage = require("../Middleware/Multer");

const AuthRouter = require("express").Router();

AuthRouter.post("/signup",uploadImage, signup);
AuthRouter.post("/login", login);
AuthRouter.post("/forgotPassword", forgotPassword);
AuthRouter.get("/:id", getUserById);
AuthRouter.put("/reset/:id", resetPassword);

module.exports = AuthRouter;