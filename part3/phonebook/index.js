require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', (request, result) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get('/info', (request, response, next) => {
	Person.countDocuments()
		.then(docCount => {
			response.send(`Phonebook has info for ${docCount} people.<br><br>${new Date()}`)
		})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			}
			else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (!body.name) {
		return response.status(400).json({ error: 'name missing' })
	}

	if (!body.number) {
		return response.status(400).json({ error: 'number missing' })
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save()
		.then(savedPerson => savedPerson.toJSON())
		.then(savedAndFormattedPerson => {
			response.json(savedAndFormattedPerson)
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(request.params.id, person, { runValidators: true, context: 'query', new: true })
		.then(updatedPerson => updatedPerson.toJSON())
		.then(updatedAndFormattedPerson => {
			response.json(updatedAndFormattedPerson)
		})
		.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})