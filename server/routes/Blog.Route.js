const {
    createBlog,
    getAllBlog,
    deleteBlog
}= require("../controllers/Blog.Controller");

const BlogRouter = require("express").Router();

BlogRouter.post("/", createBlog);
BlogRouter.get("/", getAllBlog);
BlogRouter.delete("/:id", deleteBlog);


module.exports = BlogRouter;