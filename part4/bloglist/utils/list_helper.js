const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (array) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return array.length === 0
        ? 0
        : array.reduce(reducer, 0)
}

const mostLikes = (array) => {
    if (array.length === 0)
        return 0
    else {
        const mostLikedBlog = array.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
        return {
            title: mostLikedBlog.title,
            author: mostLikedBlog.author,
            likes: mostLikedBlog.likes
        }
    }
}

const mostBlogsByAuthor = (array) => {
    /*const result = array.length === 0
        ? 0
        : _.maxBy(_.map(_.countBy(array, 'author'), (val, key) => ({ author: key, blogs: val })), 'blogs')*/
    if (array.length === 0)
        return 0
    else {
        const result = _(array)
            .countBy('author')
            .map((value, key) => ({ author: key, blogs: value }))
            .value()
        return _.maxBy(result, 'blogs')
    }
}

const mostLikesByAuthor = (array) => {
    if (array.length === 0)
        return 0
    else {
        const result = _(array)
            .groupBy('author')
            .map((objects, key) => ({ author: key, likes: _.sumBy(objects, 'likes') }))
            .value()
        return _.maxBy(result, 'likes')
    }
}

module.exports = {
    dummy,
    totalLikes,
    mostLikes,
    mostBlogsByAuthor,
    mostLikesByAuthor
}