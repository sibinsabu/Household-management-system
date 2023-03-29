const User = require("../models/User.Model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../constant/index");
const nodemailer =require('nodemailer')


const createToken = (id, name, email) => {
    return JWT.sign({
        id: id,
        name: name,
        email: email,
      },
      JWT_SECRET,{ expiresIn: "3d" }
    );
  };
  
  
  
  const signup = async (req, res) => {
    const { username, email, password, phoneNumber, accountType, jobTitle, AboutMe, location} = req.body;
    const encryptPassword = await bcrypt.hash(password, 1);
  
    const checkingIfEmailExists = await User.findOne({ where: { email: email } }); // find email in database
    if (checkingIfEmailExists) {
      // if the email much send 401
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
        });

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
              user:'ma07041705@gmail.com',
              pass:"uagrmlhtgykwbrrr"
            }
          })

        const mailOption={
            to:`${user.email}`,
            subject:"Household",
            html:'<p>You have successfully signed up for our household application. We are excited to have you on board and look forward to helping you manage your home efficiently!</p>'
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
            role: user.role,
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
        const token = createToken(foundUser.id, foundUser.name, foundUser.email);
  
        return res.status(200).json({
          success: true,
          user: {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            token: token,
            role: foundUser.role,
            userStatus: foundUser.userStatus,
          },
        });
      }
    });
  };
  
  
  
  const forgotPassword = async(req,res)=>{
    const { email} = req.body;
    
    try {
      if (!email ) {
        return res.status(40).json({
          success: false,
          message: "Email Does Not Exist",
        });
      }
        
      const user = await User.findOne({ where: { email: email } });
      if(!user){
        res.status(404).json({msg:'email does not  exists'})
        
      }else{
      //create a nodeMailer Transport
      const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user:'ma07041705@gmail.com',
          pass:"uagrmlhtgykwbrrr"
  
        }
      })
      //email option 
      const mailOption={
        // from:'brian@gmail.com',
        to:`${user.email}`,
        subject:"Forgot password link",
        html:'<p>You requested for reset password, You have this email because you have request to recover your account Click on the following link bellow to proceed the link will expire in 5 min <a href="http://localhost:3000/resetPassword/' + user.id + '">Forgot Password</a> if you did not request this please ignore this email and your password will remain the same</p>'
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
  

  
  
  module.exports = {
    login,
    signup,
    getUserById,
    forgotPassword,
    resetPassword,
  };
  