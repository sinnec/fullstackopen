import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
    const [ buttonClicked, setButtonStatus] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle} className='blog'>
            {blog.title} {blog.author}
            <button onClick={() => setButtonStatus(!buttonClicked)}>{buttonClicked ? 'hide' : 'view'}</button>
            {buttonClicked
                ? <div>
                    <p>{blog.url}</p>
                    <p className="likesContainer">likes {blog.likes}<button className="likeButton" onClick={() => updateLikes(blog)}>like</button></p>
                    <p>{blog.user.name}</p>
                    <button onClick={() => deleteBlog(blog)}>remove</button>
                </div>
                : ''
            }
        </div>
    )
}

export default Blog