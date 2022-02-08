import React, { useState } from 'react'

const BlogForm = ( { createBlog } ) => {
    const [title, setBlogTitle] = useState('')
    const [author, setBlogAuthor] = useState('')
    const [url, setBlogUrl] = useState('')

    const blogObject = {
        title: title,
        author: author,
        url: url,
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog(blogObject)

        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                title
                    <input
                        id='title'
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setBlogTitle(target.value)}
                    />
                </div>
                <div>
                author
                    <input
                        id='author'
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setBlogAuthor(target.value)}
                    />
                </div>
                <div>
                url
                    <input
                        id='url'
                        type="text"
                        value={url}
                        name="URL"
                        onChange={({ target }) => setBlogUrl(target.value)}
                    />
                </div>
                <button id="create-button" type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm