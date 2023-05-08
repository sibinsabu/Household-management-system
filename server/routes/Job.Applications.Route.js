const {
    createJobApplicants,
    getJobApplicantsByJobId
}= require("../controllers/Job.Applications.Controller");

const JobApplications = require("express").Router();
const {authenticateUser} = require("../Middleware/AuthenticateUser");

JobApplications.use(authenticateUser);
JobApplications.post("/", createJobApplicants);
JobApplications.get("/:id", getJobApplicantsByJobId);


module.exports = JobApplications;