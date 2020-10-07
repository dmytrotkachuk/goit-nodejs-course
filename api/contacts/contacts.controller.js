const Joi = require('joi')

const contacts = require('./contacts.js')

class ContactsController {

    async getContacts(req, res, next) {
        try {
            const contactsList = await contacts.listContacts()
            return res.send(contactsList)
        } catch (err) {
            next(err)
        }
    }
    async getContactById(req, res, next) {
        try {
            const contactId = Number.parseInt(req.params.contactId)
            const contact = await contacts.getContactById(contactId)
            return contact ? res.send(contact) : res.status(404).send({ message: "Not found" })
        } catch (err) {
            next(err)
        }
    }

    async createContact(req, res, next) {
        try {
            const { name, email, phone } = req.body
            await contacts.addContact(name, email, phone)
            return res.status(201).send({ "message": "Contact created" })
        } catch (err) {
            next(err)
        }
    }

    async updateContact(req, res, next) {
        try {
            const id = Number.parseInt(req.params.contactId)
            const contactToUpdate = await contacts.updateContact(id, req.body)
            return contactToUpdate ?
                res.status(200).send({ "message": "contact updated" }) :
                res.status(404).send({ "message": "Not found" })

        } catch (err) {
            next(err)
        }
    }

    async deleteContact(req, res, next) {
        try {
            const contactId = Number.parseInt(req.params.contactId)
            const contactsList = await contacts.removeContact(contactId)

            return contactsList ?
                res.status(200).send({ "message": "contact deleted" }) :
                res.status(404).send({ "message": 'Not found' })

        } catch (err) {
            next(err)
        }
    }

    validateCreateContact(req, res, next) {
        const createSchemaValidator = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required()
        })
        ContactsController.checkValidationError(createSchemaValidator, req, res, next)
    }
    validateUpdateContact(req, res, next) {
        const updateSchemaValidator = Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            phone: Joi.string()
        })
        ContactsController.checkValidationError(updateSchemaValidator, req, res, next)

    }
    static checkValidationError(schema, req, res, next) {
        const { error } = schema.validate(req.body)

        if (error) {
            const { message } = error.details[0]
            return res.status(400).send({ error: message })
        }
        next()
    }


}

module.exports = new ContactsController()