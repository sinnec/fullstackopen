import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_ANECDOTES':
        return action.data
    case 'VOTE': {
        const id = action.data.id
        const anecdoteToChange = state.find(n => n.id === id)
        const changedAnecdote = {
            ...anecdoteToChange,
            votes: anecdoteToChange.votes + 1
        }
        return state.map(anecdote =>
            anecdote.id !== id ? anecdote : changedAnecdote
        )
    }
    case 'NEW_ANECDOTE':
        return [...state, action.data]
    default:
        return state
    }
}

export const voteAnecdote = (content) => {
    return async dispatch => {
        const anecdoteToBeUpdated = {
            ...content,
            votes: content.votes + 1
        }
        const updatedAnecdote = await anecdoteService.update(anecdoteToBeUpdated.id, anecdoteToBeUpdated)
        dispatch({
            type: 'VOTE',
            data: { id: updatedAnecdote.id }
        })
    }
}

export const createAnecdote = (data) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(data)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
}

export default anecdoteReducer