const { Router } = require('express')

const ContactsController = require('./contacts.controller')

const contactsRouter = Router()

contactsRouter.get("/", ContactsController.getContacts)
contactsRouter.get("/:contactId", ContactsController.getContactById)
contactsRouter.post("/", ContactsController.validateCreateContact, ContactsController.createContact)
contactsRouter.patch("/:contactId", ContactsController.validateUpdateContact, ContactsController.updateContact)
contactsRouter.delete("/:contactId", ContactsController.deleteContact)



module.exports = contactsRouter