'use strict'

// load modules
const express = require('express')
const morgan = require('morgan')
const { sequelize } = require('./models')
const users = require('./routes/users')
const courses = require('./routes/courses')
const cors = require('cors')

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true'

// create the Express app
const app = express()

// Enable All CORS Requests
app.use(cors())

app.use(
	cors({
		origin: 'http://localhost:3000' // Allow only your React development server to access
	})
)

// setup morgan which gives us http request logging
app.use(morgan('dev'))

// Setup request body JSON parsing.
app.use(express.json())

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the REST API project!'
	})
})

// Add routes.
app.use('/api', users)
app.use('/api', courses)

// send 404 if no other route matched
app.use((req, res) => {
	res.status(404).json({
		message: 'Route Not Found'
	})
})

// setup a global error handler
app.use((err, req, res, next) => {
	if (enableGlobalErrorLogging) {
		console.error(`Global error handler: ${JSON.stringify(err.stack)}`)
	}

	res.status(err.status || 500).json({
		message: err.message,
		error: {}
	})
})

// set our port
app.set('port', process.env.PORT || 5000)

// start listening on our port
const server = app.listen(app.get('port'), () => {
	console.log(`Express server is listening on port ${server.address().port}`)
})

//Test connection to database and sync the model
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection to the database successful!')
		return sequelize.sync()
	})
	.then(() => {
		console.log('Model successfully sync with database')
	})
	.catch((error) => {
		console.log('Error connecting to the database: ', error)
	})
