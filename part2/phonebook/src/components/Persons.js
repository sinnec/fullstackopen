import React from 'react'
import SinglePerson from './SinglePerson'

const Persons = ( {personsToShow, deletePerson} ) => {
    return (
      <div>
        {personsToShow.map(person => 
          <SinglePerson key={person.name} id ={person.id} name={person.name} number={person.number} deletePerson={deletePerson}/>
        )}
      </div>
    )
}

export default Persons