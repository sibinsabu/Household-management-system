const {
    createJobApplicants,
    getJobApplicantsByJobId,
    AcceptApplicant,
}= require("../controllers/Job.Applications.Controller");

const JobApplications = require("express").Router();
const {authenticateUser} = require("../Middleware/AuthenticateUser");

JobApplications.use(authenticateUser);
JobApplications.post("/", createJobApplicants);
JobApplications.post("/AcceptApplicant", AcceptApplicant);
JobApplications.get("/:id", getJobApplicantsByJobId);


module.exports = JobApplications;