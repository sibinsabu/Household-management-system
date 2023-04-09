const User = require("../models/User.Model");
const JWT = require("jsonwebtoken");

const { JWT_SECRET } = require("../constants");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  const validate = JWT.verify(token, JWT_SECRET);

  const foundUser = await User.findOne({ where: { id: validate.id } });

  if (!foundUser) {
    return res.status(401).json({
      success: false,
      message: "Invalid login credentials",
    });
  }

  req.user = foundUser;
  next();
};

const authorizeApplicant = async (req, res, next) => {
  if (req.user.	accountType !== "applicant") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }
  
  next();
};

const authorizeHomeOwner = async (req, res, next) => {
  if (req.user.	accountType !== "Homeowner") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }
  
  next();
};

module.exports = {
    authenticateUser,
    authorizeApplicant,
    authorizeHomeOwner
};
  