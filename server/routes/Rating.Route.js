const {
    createRating,
    getAllRatingForUser,
    getAllRatingForUserById,
}= require("../controllers/Rating.Controller");

const RatingRouter = require("express").Router();
const {authenticateUser} = require("../Middleware/AuthenticateUser");

RatingRouter.use(authenticateUser);
RatingRouter.post("/", createRating);
RatingRouter.get("/", getAllRatingForUser);
RatingRouter.get("/:id", getAllRatingForUserById);


module.exports = RatingRouter;