import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [NotificationMessage, setNotificationMessage] = useState(null)
    const [messageClass, setMessageClass] = useState('')

    useEffect(() => {
        blogService.getAll()
            .then(blogs => {
                setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
            }

            )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        const returnedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(returnedBlog))
        setMessageClass('success')
        setNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} was added!`)
        setTimeout(() => {
            setNotificationMessage(null)
            setMessageClass('')
        }, 5000)
    }

    const updateLikes = async (blogObject) => {
        const updatedBlog = { ...blogObject, likes: blogObject.likes + 1, user: blogObject.user.id }
        const returnedBlog = await blogService.update(blogObject.id, updatedBlog)
        const newBlogs = blogs.map(blog => blog.id !== blogObject.id ? blog : { ...returnedBlog, user: blogObject.user })
        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
    }

    const deleteBlog = async (blogObject) => {
        if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
            await blogService.deleteEntry(blogObject.id)
            setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setMessageClass('success')
            setNotificationMessage(`${user.name} successfully logged-in`)
            setTimeout(() => {
                setNotificationMessage(null)
                setMessageClass('')
            }, 5000)
        } catch (exception) {
            setMessageClass('error')
            setNotificationMessage('Wrong username or password')
            setTimeout(() => {
                setNotificationMessage(null)
                setMessageClass('')
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const blogFormRef = useRef()

    const blogForm = () => (
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )

    return (
        <div>
            {user === null
                ? <div>
                    <h2>log in to application</h2>
                    <Notification className={messageClass} message={NotificationMessage} />
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                </div>
                : <div>
                    <h2>blogs</h2>
                    <Notification className={messageClass} message={NotificationMessage} />
                    <p>
                        {user.name} logged in
                        <button onClick={() => handleLogout()}>
                logout
                        </button>
                    </p>
                    {blogForm()}
                    <div id='blog-container'>
                        {blogs.map(blog =>
                            <Blog key={blog.id}
                                blog={blog}
                                updateLikes={updateLikes}
                                deleteBlog={deleteBlog}/>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default App