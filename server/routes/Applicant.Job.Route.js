const {
    getAllJobListing,
    getJobListingById,
}= require("../controllers/Job.Listing.Controller");

const BlogRouter = require("express").Router();


BlogRouter.get("/", getAllJobListing);
BlogRouter.get("/:id", getJobListingById);



module.exports = BlogRouter;