const Applicants = require('../models/Job.Applications.Model')
const User = require('../models/User.Model')
const JobListings = require('../models/Job.ListingModel')


function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month}-${day}`;
}

const createJobApplicants = async (req, res) => {
  const { job_id, ApplicantNumber } = req.body;
  const user_id = req.user.id;
  const date = getCurrentDate();

  if(!job_id || !ApplicantNumber){
    return res.status(400).json({
      success: false,
      message: "All Fields Are Required",
    });
  }
  
  try {
    const existingApplicant = await Applicants.findOne({ where: {user_id: user_id, job_id: job_id }});
  
    if (existingApplicant) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job"
      });
    }
    const Applicant = await Applicants.create({
      user_id: user_id,
      job_id: job_id,
      date: date
    });
    const jobListing = await JobListings.findOne({ where: { job_id: job_id } });
    const updatedApplicantNumber = jobListing.ApplicantNumber + 1;
    const UpdateJobApplicant = await JobListings.update({ ApplicantNumber: updatedApplicantNumber }, { where: { job_id: job_id } });

    return res.status(200).json({ success: true, Applicant});
  } catch (error) {
    res.json({ message: error.message });
  }
}



const getJobApplicantsByJobId = async (req, res) => {
  const jobId = req.params.id;
  try {
    const jobListing = await JobListings.findOne({ where: { job_id: jobId } });
    
    if (!jobListing) {
      return res.status(400).json({
        success: false,
        message: "Job not found"
      });
    }
    
    const applicant = await Applicants.findAll({ 
      where: { job_id: jobId },
      include: [
        { model: User, attributes: ['id', 'username', 'email', 'phoneNumber', 'jobTitle', 'AboutMe', 'location'] }
      ]
    });
    const jobData = {
      job_id: jobListing.job_id,
      description: jobListing.description,
      jobTile: jobListing.jobTile,
      salary: jobListing.salary,
      timeSchedule: jobListing.timeSchedule,
      ApplicantNumber: jobListing.ApplicantNumber,
    };
    return res.status(200).json({ success: true, jobData, applicant });
  } catch (error) {
    res.json({ message: error.message });
  }
}



 
module.exports = {
    createJobApplicants,
    getJobApplicantsByJobId,
};
  
