const JobListing = require('../models/Job.ListingModel')
const User = require('../models/User.Model')



function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-${month}-${day}`;
}

const createJobListing = async (req, res) => {
    const { description, location, jobTile, timeSchedule, salary} = req.body;
    const user_id = req.user.id;
    const date = getCurrentDate();

    if(!description || !location || !jobTile || !timeSchedule || !salary){
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    try {
        await JobListing.create({
           user_id: user_id,
           description: description,
           location: location,
           jobTile: jobTile,
           timeSchedule: timeSchedule,
           salary: salary,
           status: "Posted",
           date: date
        });
        res.json({ "message": "Created" });
    } catch (error) {
        res.json({ message: error.message });
    }  
}


const getAllJobListing = async (req, res) => {
    try {
      const jobListing = await JobListing.findAll({ 
        include: [{
          model: User,
          attributes: ['username', 'email', 'phoneNumber', 'accountType', 'jobTitle', 'AboutMe', 'location', 'image']
        }]
      });
        return res.status(200).json({ success: true, jobListing});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message});
    }
}
 

const getJobListingById = async (req, res) => {
    const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: "Id is missing"});
  }
  try {
     const jobListings = await JobListing.findAll({ where: {job_id: id },
      include: [{
        model: User,
        attributes: ['username', 'email', 'phoneNumber', 'accountType', 'jobTitle', 'AboutMe', 'location', 'image']
      }]});
     if (!jobListings) {
        return res.status(404).json({success: false,message: "JobListings not found"});
    }
     return res.status(200).json({ success: true, jobListings });
    } catch (error) {
        return res.status(500).json({ success: false, message:  error.message});
    } 
}


const updateJobListing = async (req, res) => {
    const { id } = req.params;
    const { description, location, jobType, schedule, salary, status} = req.body;
  
    try {
      const JobListings = await JobListing.findOne({ where: { job_id: id } });
  
      let info = {
        description: description,
        location: location,
        jobType: jobType,
        schedule: schedule,
        salary: salary,
        status: status,
      }
  
      if (!JobListings) {
        return res.status(404).json({ success: false, message: "JobListings not found"});
      }
  
     await JobListing.update(info, {where: { job_id: id} });
      return res.status(200).json({ success: true, JobListings: JobListings});
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message});
    }
  };

 
const deleteJobListings = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({success: false, message: "Id is missing"});
    }
  
    try {
     const JobListings = await JobListing.findOne({ where: {job_id: id } });
      if (!JobListings) {
       return res.status(404).json({ success: false, message: "JobListings not found"});
      }
  
     await JobListing.destroy({ where: {job_id: id } });
      return res.status(200).json({ success: true, JobListings: id});
    } catch (error) {
      return res.status(500).json({success: false, message: error.message});
    }
  };



 
 
module.exports = {
    createJobListing,
    getAllJobListing,
    getJobListingById,
    deleteJobListings,
    updateJobListing
};
  
 