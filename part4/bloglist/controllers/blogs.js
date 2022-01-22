const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {

    const user = request.user

    const blog = new Blog({
        ...request.body,
        likes: request.body.likes || 0,
        user: user._id
    })

    if (!request.body.title || !request.body.author)
        response.send(400) //the only way to get 400 code instead of 500

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id)

    const user = request.user

    if (blogToDelete.user.toString() !== user._id.toString()) {
        return response.status(403).json({ error: 'Forbidden: invalid user' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        ...body,
        likes: body.likes || 0
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter