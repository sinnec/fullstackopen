import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = (props) => {
    return(
        <div>
            {props.anecdotes
                .sort((a, b) => (b.votes > a.votes) ? 1 : -1)
                .map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => {
                            props.voteAnecdote(anecdote)
                            props.setNotification(`you voted ${anecdote.content}`, 5)
                        }
                        }
                    />
                )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: !state.filter
            ? state.anecdotes
            : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList