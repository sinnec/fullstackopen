import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM, fireEvent } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
    let component

    const blog = {
        title: 'It\'s a test',
        author: 'Testy Testidis',
        url: 'www.you.io',
        likes: 12,
        user: {
            username: 'jayZ',
            name: 'John'
        }
    }

    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog blog={blog} updateLikes={mockHandler}/>
        )
    })

    test('renders content without url and likes', () => {
        const div = component.container.querySelector('.blog')
        console.log(prettyDOM(div))

        expect(div).toHaveTextContent('It\'s a test')
        expect(div).toHaveTextContent('Testy Testidis')
        expect(div.url).toBeUndefined()
        expect(div.likes).toBeUndefined()
    })

    test('after clicking the button, url and likes are displayed', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.blog')
        expect(div).toHaveTextContent('www.you.io')
    })

    test('like button is clicked twice', () => {
        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})