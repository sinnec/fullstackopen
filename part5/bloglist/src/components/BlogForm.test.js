import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
        target: { value: 'Test Blog' }
    })
    fireEvent.change(authorInput, {
        target: { value: 'Testos Testidis' }
    })
    fireEvent.change(urlInput, {
        target: { value: 'www.test.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Blog')
})