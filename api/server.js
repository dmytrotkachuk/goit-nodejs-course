const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const contactsRouter = require('./contacts/contacts.routes')
require('dotenv').config()



const PORT = process.env.PORT || 3000

class UserService {

    constructor() {
        this.server = null
    }

    start() {
        this.initServer()
        this.initMiddleware()
        this.initRoutes()
        this.errorHandler()
        this.startListening()
    }

    initServer() {
        this.server = express()
    }

    initMiddleware() {
        //stringify in JSON
        this.server.use(express.json())
        //cors
        this.server.use(cors({ origin: 'http://localhost:3000' }))
        //logger
        this.server.use(logger('dev'))
    }

    initRoutes() {
        this.server.use('/api', contactsRouter)
    }

    errorHandler() {
        this.server.use((err, req, res, next) => {
            if (err) {
                const code = err.status ? err.status : 400
                res.status(code).send({ message: err.message })
            }
        })
    }

    startListening() {
        this.server.listen(PORT, () => {
            console.log(`Server has been started on port: ${PORT}`)
        })
    }
}

module.exports = UserService
