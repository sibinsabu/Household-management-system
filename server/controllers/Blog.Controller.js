const Blog = require('../models/Blog.Model')
const User = require('../models/User.Model')


function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month}-${day}`;
  }

const createBlog = async (req, res) => {
    const { user_id, description} = req.body;
    const date = getCurrentDate();

    try {
        await Blog.create({
           user_id: user_id,
           description: description,
           date: date,
        });
        res.json({
            "message": "Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}


const getAllBlog = async (req, res) => {
    try {
      const blogs = await Blog.findAll({
        include: [{
          model: User,
          attributes: ['username', 'email', 'phoneNumber', 'accountType', 'jobTitle', 'AboutMe', 'location']
        }]
      });
      res.json({ blogs });
    } catch (error) {
      res.json({ message: error.message });
    }
  }


  const deleteBlog = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "blog_id is missing",
      });
    }
  
    try {
      await Blog.destroy({ where: { blog_id: id } });
      return res.status(200).json({
        success: true,
        BlogId:id,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
 
 
module.exports = {
    createBlog,
    getAllBlog,
    deleteBlog
  };
  
 
