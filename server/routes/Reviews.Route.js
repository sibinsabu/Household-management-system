const {
    createReview,
    getAllReview,
}= require("../controllers/Reviews.Controller");

const ReviewRouter = require("express").Router();

ReviewRouter.post("/", createReview);
ReviewRouter.get("/", getAllReview);


module.exports = ReviewRouter;