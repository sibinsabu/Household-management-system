const {
    login,
    signup,
    getUserById, 
    forgotPassword,
    resetPassword,
    updateUserProfile,
    updateUserImage
}= require("../controllers/User.Controller");
const uploadImage = require("../Middleware/Multer");

const AuthRouter = require("express").Router();

AuthRouter.post("/signup",uploadImage, signup);
AuthRouter.post("/login", login);
AuthRouter.post("/forgotPassword", forgotPassword);
AuthRouter.get("/:id", getUserById);
AuthRouter.put("/reset/:id", resetPassword);
AuthRouter.patch("/updateUserProfile/:id", uploadImage, updateUserProfile);
AuthRouter.patch("/updateUserProfile/image/:id", uploadImage, updateUserImage);

module.exports = AuthRouter;