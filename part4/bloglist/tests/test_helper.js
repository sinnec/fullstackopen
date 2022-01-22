const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'How to create a fake ID',
        author: 'Tamila Zamolonchikova',
        url: 'www.tamila4all.com',
        likes: 5,
        id: '60f95f6e440af02fb4344ea6'
    },
    {
        title: 'Mpros-Piso',
        author: 'Periadros Popotas',
        url: 'www.arkadiatv.gr',
        likes: 1,
        id: '60f96139440af02fb4344ea9'
    },
    {
        title: 'Black Fungus',
        author: 'Delta V',
        url: 'www.covid19.gr',
        likes: 125458,
        id: '60f9ae0783f9633ae4b13793'
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}