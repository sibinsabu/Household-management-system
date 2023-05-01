const {
    createJobListing,
    getAllJobListing,
    getAllJobForUserById,
    getJobListingById,
    deleteJobListings,
    updateJobListing
}= require("../controllers/Job.Listing.Controller");

const BlogRouter = require("express").Router();
const {authenticateUser} = require("../Middleware/AuthenticateUser");

BlogRouter.use(authenticateUser);
BlogRouter.post("/", createJobListing);
BlogRouter.get("/", getAllJobListing);
BlogRouter.get("/singleJob", getAllJobForUserById);
BlogRouter.get("/:id", getJobListingById);
BlogRouter.patch("/:id",updateJobListing);
BlogRouter.delete("/:id", deleteJobListings);


module.exports = BlogRouter;