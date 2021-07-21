import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'
import Input from './components/Input'
import Form from './components/Form'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ NotificationMessage, setNotificationMessage ] = useState(null)
  const [ messageClass, setMessageClass ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const contactExists = persons.find( ( {name} ) => name === newName)
    if (!contactExists) {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(nameObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
        setMessageClass('success')
        setNotificationMessage(`Added ${newName}`)
        setTimeout(() => {
          setNotificationMessage(null)
          setMessageClass('')
        }, 5000)
      })
      .catch(error => {
        setMessageClass('error')
        setNotificationMessage(error.response.data.error)
        setTimeout(() => {
          setNotificationMessage(null)
          setMessageClass('')
        }, 5000)
      })
    }
    else { 
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with the new?`)) {
        const changedContact = { ...contactExists, number: newNumber }
        personService
        .update(contactExists.id, changedContact)
        .then(returnedContact => {
          setPersons(persons.map(contact => contact.id !== contactExists.id ? contact : returnedContact))
          setNewName('')
          setNewNumber('')
          setMessageClass('success')
          setNotificationMessage(`Updated ${newName}`)
          setTimeout(() => {
          setNotificationMessage(null)
          setMessageClass('')
        }, 5000)
        })
        .catch(error => {
          setMessageClass('error')
          setNotificationMessage(error.response.data.error)
          setTimeout(() => {
            setNotificationMessage(null)
            setMessageClass('')
          }, 5000)
        })
      }
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete contact ${name}`)) {
    personService
      .deleteEntry(id)
      .then(() =>
        setPersons(persons.filter(contact => contact.id !== id))
      )
      .catch(error => {
        setPersons(persons.filter(n => n.id !== id))
        setMessageClass('error')
        setNotificationMessage(`Information of ${name} has already been deleted from the server!`)
        setTimeout(() => {
          setNotificationMessage(null)
          setMessageClass('')
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = !nameFilter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <>
      <h2>Phonebook</h2>
      <Notification className={messageClass} message={NotificationMessage} />
      <Input text="filter shown with" value={nameFilter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <Form
        onSubmit={addPerson}
        nameInput={newName} nameChange={handleNameChange}
        numberInput={newNumber} numberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </>
  )
}

export default App