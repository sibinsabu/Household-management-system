const {
    createBlog,
    getAllBlog,
    getAllBlogForUserById,
    BlogLike ,
    deleteBlog
}= require("../controllers/Blog.Controller");

const BlogRouter = require("express").Router();
const uploadImage = require("../Middleware/Multer");
const {authenticateUser} = require("../Middleware/AuthenticateUser");

BlogRouter.use(authenticateUser);
BlogRouter.post("/", uploadImage ,createBlog);
BlogRouter.get("/", getAllBlog);
BlogRouter.get("/SingleUser", getAllBlogForUserById);
BlogRouter.put("/:id", BlogLike );
BlogRouter.delete("/:id", deleteBlog);


module.exports = BlogRouter;