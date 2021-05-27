import React from 'react'

const SinglePerson = ({ id, name, number, deletePerson }) =>  (
    <div>
        {name} {number}
        <button onClick={() => deletePerson(id, name)}>delete</button>
    </div>
)

export default SinglePerson