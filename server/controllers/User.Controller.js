const User = require("../models/User.Model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../constant/index");
const nodemailer =require('nodemailer')
const cloudinary = require("cloudinary").v2;


const createToken = (id, name, email) => {
    return JWT.sign({
        id: id,
        name: name,
        email: email,
      },
      JWT_SECRET,{ expiresIn: "1d" }
    );
};
  
cloudinary.config({
  cloud_name: "dows56r9v",
  api_key: "296524897655252",
  api_secret: "LSawka1n4AuQ-nrhVcDdaGlqSgI"
});
  
const signup = async (req, res) => {
    const { username, email, password, phoneNumber, accountType, jobTitle, AboutMe, location} = req.body;

    if(!username || !email || !password || !phoneNumber || !accountType || !AboutMe || !location){
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const encryptPassword = await bcrypt.hash(password, 1);
  
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "Users" })

    const checkingIfEmailExists = await User.findOne({ where: { email: email } });
    if (checkingIfEmailExists) {
      return res.status(401).json({
        success: false,
        message: "Email already exists",
      });
    } else {
      try {
        const user = await User.create({
          username: username,
          email: email,
          password: encryptPassword,
          phoneNumber: phoneNumber,
          accountType: accountType,
          jobTitle: jobTitle,
          AboutMe: AboutMe,
          location: location,
          image: result.secure_url,
        });

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
              user:'ma07041705@gmail.com',
              pass:"uagrmlhtgykwbrrr"
            }
        })

        const mailOption={
            to: `${user.email}`,
            subject: "Welcome to Household App!",
            html: `
              <html>
                <head>
                </head>
                <body>
                  <table style="border-collapse: collapse;">
                    <tr>
                      <td style="padding: 20px;">
                        <h1 style="font-size: 28px; margin-top: 0;">Household</h1>
                        <h1 style="font-size: 28px; margin-top: 0;">Welcome to Household App!</h1>
                        <p style="font-size: 18px;">You have successfully signed up for our household application. We are excited to have you on board and look forward to helping you manage your home efficiently!</p>
                        <p style="font-size: 18px;">Please click the button below to confirm your email address:</p>
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
              console.log('There was a response ',response);
              res.status(200).json('recovery email sent ')
            }
        })
  
        const token = createToken(user.id, user.name, user.email);
          return res.status(200).json({
            success: true,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              token: token,
            },
          });
      } catch (error) {
        return res.json({ message: error.message });
      }
    }
  };
  
  
  
  const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username or password is missing",
      });
    }
  
  
    const foundUser = await User.findOne({ where: { email: email } });
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid login credentials",
      });
    }
  
    const dbPassword = foundUser.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        return res.status(401).json({
          success: false,
          message: "Invalid login credentials",
        });
      } else {
        const token = createToken(foundUser.id, foundUser.username, foundUser.image);
  
        return res.status(200).json({
          success: true,
          user: {
            id: foundUser.id,
            name: foundUser.username,
            image: foundUser.image,
            accountType: foundUser.accountType,
            token: token,
           
          },
        });
      }
    });
  };
  
  
  
  const forgotPassword = async(req,res)=>{
    const { email} = req.body;
    
    try {
      if (!email ) {
        return res.status(400).json({
          success: false,
          message: "Email Does Not Exist",
        });
      }
        
      const user = await User.findOne({ where: { email: email } });
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
        subject: "Reset Your Password - Household",
        html: `
          <html>
            <head>
            </head>
            <body>
              <table style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 20px;">
                    <h1 style="font-size: 28px; margin-top: 0;">Reset Your Password</h1>
                    <p style="font-size: 18px;">You received this email because you requested to reset your password on YourCompanyName. If you did not make this request, you can safely ignore this email.</p>
                    <p style="font-size: 18px;">To reset your password, please click the button below. The link will expire in 5 minutes:</p>
                    <div style="margin-top: 30px; text-align: center;">
                      <a href="http://localhost:8080/reset-password/${user.id}" style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none; border-radius: 4px; text-decoration: none; font-size: 18px;">Reset Password</a>
                    </div>
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
          console.log('There was a response ',response);
          res.status(200).json('recovery email sent ')
        }
       })
      }
    } catch (error) {
      return res.json({ message: error.message, success: false });
    }
  
  }
  


  const resetPassword =async(req,res)=>{
    const { password ,confirm_password} = req.body;
    const encryptPassword = await bcrypt.hash(password, 10);
  
    if(password === confirm_password){
      console.log("Password Muches")
    }else{
      return res.status(400).json({
        success: false,
        message: "Password Does Not Much",
      });
    }
  
    try {
      const updatedUser = await User.update({password: encryptPassword}, { where: { id: req.params.id}})
      res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  }



  const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is missing",
      });
    }
  
    try {
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          user,
        });
      }
    } catch (error) {
      return res.json({ message: error.message, success: false });
    }
  };
  

  const updateUserProfile = async (req, res) => {
    const { username, email, phoneNumber, accountType, jobTitle, AboutMe, location} = req.body;

    if(!username || !email || !phoneNumber || !jobTitle || !accountType || !AboutMe || !location){
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    try {
      const updatedUser = await User.update({
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        accountType: accountType,
        jobTitle: jobTitle,
        AboutMe: AboutMe,
        location: location,
      }, { where: { id: req.params.id}})
      res.status(200).json({
        success: true,
        user: updatedUser,
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  
  
  module.exports = {
    login,
    signup,
    getUserById,
    forgotPassword,
    resetPassword,
    updateUserProfile
  };
  