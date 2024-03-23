// Import express using CommonJS syntax
import express from 'express';
const blogRouter = express.Router();

import {getAllBlogs,addBlog,deleteBlog,updateBlog,getById,getUserBlogs} from '../controllers/blogController.js';

blogRouter.get('/', getAllBlogs);
blogRouter.get('/:id', getById);
blogRouter.post('/addBlog', addBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.delete('/deleteBlog/:id',deleteBlog);
blogRouter.get('/user/:id', getUserBlogs);

export default blogRouter;