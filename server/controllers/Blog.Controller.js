const Blog = require('../models/Blog.Model')
const User = require('../models/User.Model')
const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv');
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const createBlog = async (req, res) => {
    const { description} = req.body;
    const user_id = req.user.id;

    if(!description){
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "Blogs" });

    try {
      const blog = await Blog.create({
        user_id: user_id,
        description: description,
        image: result.secure_url,
      });
      return res.status(200).json({
        success: true,
        blog
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
          attributes: ['username', 'email', 'phoneNumber', 'accountType', 'jobTitle', 'AboutMe', 'location', 'image']
        }]
      });
       return res.status(201).json({
      success: true,
       blogs,
    });
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  const getAllBlogForUserById = async (req, res) => {
    const user_id = req.user.id;
  
    try {
      const blogs = await Blog.findAll({
        where: { user_id },
        include: [{
          model: User
        }]
      });
      return res.status(200).json({
        success: true,
        blogs,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  


  const BlogLike = async (req, res) => {
    const blog_id = req.params.id;
    const blog = await Blog.findOne({ where: {blog_id: req.params.id } });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
  
    const BlogLike = await Blog.update({ likes: blog.likes + 1 },{ where: { blog_id: req.params.id}, returning: true }
    );
  
    res.status(200).json({
      success: true,
       blog:  BlogLike
    });
  };
  
  

  

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
    getAllBlogForUserById,
    BlogLike ,
    deleteBlog
  };
  
 
