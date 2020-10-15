const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('morgan')
const contactsRouter = require('./contacts/contacts.routes')
require('dotenv').config()


const URI = process.env.MONGO_URI || ''
const PORT = process.env.PORT || 3000

class UserService {

    constructor() {
        this.server = null
    }

    async start() {
        this.initServer()
        this.initMiddleware()
        this.initRoutes()
        await this.initDb()
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

    async initDb() {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

        try {
            await mongoose.connect(URI, opts)
        } catch (err) {
            console.log("Server was closed with connect to db")
            process.exit(1)
        }
        console.log("Database connection successful")
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
