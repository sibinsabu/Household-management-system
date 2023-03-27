const {
    login,
    signup,
    getUserById, 
    forgotPassword,
    resetPassword
}= require("../controllers/User.Controller");

const AuthRouter = require("express").Router();

AuthRouter.post("/login", login);
AuthRouter.post("/signup", signup);
AuthRouter.post("/forgotPassword", forgotPassword);
AuthRouter.get("/:id", getUserById);
AuthRouter.put("/reset/:id", resetPassword);

module.exports = AuthRouter;