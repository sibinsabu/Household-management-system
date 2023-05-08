const {
    createJobListing,
    getAllJobListing,
    getAllJobForUserById,
    getJobListingById,
    deleteJobListings,
    updateJobListing
}= require("../controllers/Job.Listing.Controller");

const JobListing = require("express").Router();
const {authenticateUser} = require("../Middleware/AuthenticateUser");

JobListing.use(authenticateUser);
JobListing.post("/", createJobListing);
JobListing.get("/", getAllJobListing);
JobListing.get("/singleJob", getAllJobForUserById);
JobListing.get("/:id", getJobListingById);
JobListing.patch("/:id",updateJobListing);
JobListing.delete("/:id", deleteJobListings);


module.exports = JobListing;