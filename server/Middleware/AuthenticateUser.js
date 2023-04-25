const User = require("../models/User.Model");
const JWT = require("jsonwebtoken");

const { JWT_SECRET } = require("../constant/index");

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



module.exports = {
    authenticateUser,
};
  