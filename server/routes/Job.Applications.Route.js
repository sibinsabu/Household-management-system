const {
    createJobApplicants,
    getJobApplicantsByJobId
}= require("../controllers/Job.Applications.Controller");

const BlogRouter = require("express").Router();
const {authenticateUser} = require("../Middleware/AuthenticateUser");

BlogRouter.use(authenticateUser);
BlogRouter.post("/", createJobApplicants);
BlogRouter.get("/:id", getJobApplicantsByJobId);


module.exports = BlogRouter;