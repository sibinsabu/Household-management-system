const Applicants = require('../models/Job.Applications.Model')
const User = require('../models/User.Model')
const JobListings = require('../models/Job.ListingModel')
const nodemailer =require('nodemailer')


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
      jobTitle: jobListing.jobTitle,
      salary: jobListing.salary,
      timeSchedule: jobListing.timeSchedule,
      ApplicantNumber: jobListing.ApplicantNumber,
    };
    return res.status(200).json({ success: true, jobData, applicant });
  } catch (error) {
    res.json({ message: error.message });
  }
}

const AcceptApplicant = async(req,res)=>{
  const { user_id} = req.body;
  
  try {
    if (!user_id ) {
      return res.status(400).json({
        success: false,
        message: "user Does Not Exist",
      });
    }
    const user = await User.findOne({ where: {id: user_id } });
    if(!user){
      return res.status(404).json({
        success: false,
        message:'email does not  exists'
      })
      
    }else{
    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'ma07041705@gmail.com',
        pass:"uagrmlhtgykwbrrr"

      }
    })
    const mailOption = {
      to: `${user.email}`,
      subject: "Application - Household",
      html: `
        <html>
          <head>
          </head>
          <body>
          <table style="border-collapse: collapse;">
            <tr>
              <td style="padding: 20px;">
                <h1 style="font-size: 28px; margin-top: 0;">Congratulations! Your Application has been Accepted </h1>
                <p style="font-size: 18px;">Dear ${user.username}</p>
                <p style="font-size: 18px;">I delighted to inform you that your application has been accepted.</p>
                <p style="font-size: 18px;">I impressed by your qualifications, experience, and the passion you expressed for the role. We believe you will be a valuable addition to our team and contribute significantly to our organization.</p>
                <p style="font-size: 18px;">To proceed with the next steps, please review the attached offer letter/contract and follow the instructions provided. If you have any questions or require further clarification, feel free to contact [Contact Person/Department] at [Email Address/Phone Number].</p>
                <p style="font-size: 18px;">Once again, congratulations on your successful application. We look forward to welcoming you on board and wish you all the best in your new role.</p>
              </td>
            </tr>
          </table>
          </body>
        </html>
      `
    }      
    
    transporter.sendMail(mailOption,(err ,response)=>{
      if(err){
        console.log('There was an error',err);
      }else{
        return res.status(200).json({ success: true});
      }
     })
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }

}




module.exports = {
    createJobApplicants,
    getJobApplicantsByJobId,
    AcceptApplicant,
}
  
