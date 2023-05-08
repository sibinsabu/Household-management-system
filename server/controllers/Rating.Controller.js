const Ratings = require('../models/Rating.Model')


const createRating = async (req, res) => {
    const { rated_user_id, rating } = req.body;
    const user_id = req.user.id;

    if(!rated_user_id || !rating){
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    try {
      const ratings = await Ratings.create({
        user_id: user_id,
        rated_user_id: rated_user_id,
        rating: rating,
      });
      return res.status(200).json({success: true, ratings});
    } catch (error) {
        res.json({ message: error.message });
    }  
}



const getAllRatingForUserById = async (req, res) => {
  const user_id = req.user.id;
  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "user_id parameter is required",
    });
  }
  try {
    const ratings = await Ratings.findAll({ where: { rated_user_id: user_id } });
    const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return res.status(200).json({
      success: true,
      totalRating
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


 
module.exports = {
    createRating,
    getAllRatingForUserById,
  };
  