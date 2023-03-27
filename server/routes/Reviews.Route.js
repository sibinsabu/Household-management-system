const {
    createReview,
    getAllReview,
}= require("../controllers/Reviews.Controller");

const BlogRouter = require("express").Router();

BlogRouter.post("/", createReview);
BlogRouter.get("/", getAllReview);


module.exports = BlogRouter;