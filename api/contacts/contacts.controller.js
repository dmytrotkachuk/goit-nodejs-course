const Joi = require('joi')

const ContactModel = require('./contacts.model')


class ContactsController {

    async getContacts(req, res, next) {
        try {
            const { sub, page, limit } = req.query
            const options = {
                page: page || 1,
                limit: limit || 20
            }
            const contactsList = await ContactModel.paginate(sub && { subscription: sub }, options)

            return res.send(contactsList.docs)
        } catch (err) {
            next(err)
        }
    }

    async getContactById(req, res, next) {
        try {
            const contact = await ContactModel.findById(req.params.contactId)
            return contact ? res.status(200).send(contact) : res.status(404).send({ message: "Not found" })
        } catch (err) {
            next(err)
        }
    }

    async createContact(req, res, next) {
        try {
            await ContactModel.create(req.body)
            return res.status(201).send({ "message": "Contact created" })
        } catch (err) {
            next(err)
        }
    }

    async updateContact(req, res, next) {
        try {
            const contact = await ContactModel.findByIdAndUpdate(req.params.contactId, req.body)
            return contact ?
                res.status(200).send({ "message": "contact updated" }) :
                res.status(404).send({ "message": "Not found" })

        } catch (err) {
            next(err)
        }
    }

    async deleteContact(req, res, next) {
        try {
            const contact = await ContactModel.findByIdAndDelete(req.params.contactId)
            if (!contact) {
                return res.status(404).send({ "message": 'Not found' })
            }
            return res.status(200).send({ "message": "contact deleted" })
        } catch (err) {
            next(err)
        }
    }

    validateCreateContact(req, res, next) {
        const createSchemaValidator = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            subscription: Joi.string().required(),
            password: Joi.string().required(),
            // token: Joi.allow(),
        })
        ContactsController.checkValidationError(createSchemaValidator, req, res, next)
    }
    validateUpdateContact(req, res, next) {
        const updateSchemaValidator = Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            phone: Joi.string(),
            subscription: Joi.string(),
            password: Joi.string(),
            token: Joi.string(),
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