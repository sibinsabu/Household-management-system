const Review = require('../models/Reviews.Modal')
const User = require('../models/User.Model')


const createReview = async (req, res) => {
    const { user_id, description} = req.body;

    try {
        await Review.create({
           user_id: user_id,
           description: description,
        });
        res.json({
            "message": "Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}


const getAllReview = async (req, res) => {
  try {
    const { page = 1, limit = 1 } = req.query;
    const offset = (page - 1) * limit;

    const Reviews = await Review.findAll({
      include: [{
        model: User,
        attributes: ['username', 'email', 'phoneNumber', 'accountType', 'jobTitle', 'AboutMe', 'location']
      }],
      limit,
      offset
    });

    res.json({ Reviews });
  } catch (error) {
    res.json({ message: error.message });
  }
};


 
 
module.exports = {
    createReview,
    getAllReview,
};
  
 