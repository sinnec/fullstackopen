const totalLikes = require('../utils/list_helper').totalLikes
const mostLikes = require('../utils/list_helper').mostLikes
const mostBlogsByAuthor = require('../utils/list_helper').mostBlogsByAuthor
const mostLikesByAuthor = require('../utils/list_helper').mostLikesByAuthor

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

describe('blogs total likes', () => {
    test('when list has many blogs', () => {
        const result = totalLikes(blogs)
        expect(result).toBe(36)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has no blogs', () => {
        expect(totalLikes([])).toBe(0)
    })
})

describe('blog with most likes', () => {
    test('when list has many blogs, but not two with most likes', () => {
        const result = mostLikes(blogs)
        expect(result).toEqual(
            {
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                likes: 12
            }
        )
    })

    test('when list has many blogs, but two with most likes', () => {
        const blogWithMaxLikes = {
            _id: '5a422b3a1b54a676234d17f8',
            title: 'Re-Canonical re-string re-reduction',
            author: 'Jonathan F. Spears',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        }
        const result = mostLikes(blogs.concat(blogWithMaxLikes))
        expect(result).toEqual(
            {
                title: 'Re-Canonical re-string re-reduction',
                author: 'Jonathan F. Spears',
                likes: 12
            }
        )
    })

    test('when list has only one blog', () => {
        const result = mostLikes(listWithOneBlog)
        expect(result).toEqual(
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 5
            }
        )
    })

    test('when list has no blogs', () => {
        expect(mostLikes([])).toBe(0)
    })
})

describe('author with most blogs', () => {
    test('when list has many blogs, but not two with most likes', () => {
        const result = mostBlogsByAuthor(blogs)
        expect(result).toEqual(
            {
                author: 'Robert C. Martin',
                blogs: 3
            }
        )
    })

    test('when list has only one blog', () => {
        const result = mostBlogsByAuthor(listWithOneBlog)
        expect(result).toEqual(
            {
                author: 'Edsger W. Dijkstra',
                blogs: 1
            }
        )
    })

    test('when list has no blogs', () => {
        expect(mostBlogsByAuthor([])).toBe(0)
    })
})

describe('author with most likes', () => {
    test('when list has many blogs, but not two with most likes', () => {
        const result = mostLikesByAuthor(blogs)
        expect(result).toEqual(
            {
                author: 'Edsger W. Dijkstra',
                likes: 17
            }
        )
    })

    test('when list has only one blog', () => {
        const result = mostLikesByAuthor(listWithOneBlog)
        expect(result).toEqual(
            {
                author: 'Edsger W. Dijkstra',
                likes: 5
            }
        )
    })

    test('when list has no blogs', () => {
        expect(mostLikesByAuthor([])).toBe(0)
    })
})