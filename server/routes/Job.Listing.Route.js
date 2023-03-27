const {
    createJobListing,
    getAllJobListing,
    getJobListingById,
    deleteJobListings,
    updateJobListing
}= require("../controllers/Job.Listing.Controller");

const BlogRouter = require("express").Router();

BlogRouter.post("/", createJobListing);
BlogRouter.get("/", getAllJobListing);
BlogRouter.get("/:id", getJobListingById);
BlogRouter.patch("/:id",updateJobListing);
BlogRouter.delete("/:id", deleteJobListings);


module.exports = BlogRouter;