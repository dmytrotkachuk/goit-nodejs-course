const { promises: fsPromises } = require('fs')
const path = require('path')
// const { updateContact } = require('./contacts.controller')

const contactsPath = path.join(__dirname, './db/contacts.json')

async function listContacts() {
    const data = await fsPromises.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    return contacts
}


async function getContactById(contactId) {
    const data = await listContacts()
    return data.find(contact => contactId && contact.id === contactId)

}

async function removeContact(contactId) {
    const idxOfContact = await getContactById(contactId)
    if (!idxOfContact) {
        return false
    }
    const data = await listContacts()
    const filteredContacts = data.filter((contact) => contact.id !== contactId)
    fsPromises.writeFile(contactsPath, JSON.stringify(filteredContacts))
    return filteredContacts
}

async function addContact(name, email, phone) {
    const data = await listContacts()
    const contactId = data[data.length - 1].id + 1

    data[data.length] = {
        id: contactId,
        name,
        email,
        phone
    }

    fsPromises.writeFile(contactsPath, JSON.stringify(data))

}

async function updateContact(contactId, dataUpdate) {
    const contactInContacts = await getContactById(contactId)
    if (!contactInContacts) {
        return false
    }
    const data = await listContacts()
    let updated
    data.forEach((el, idx) => {
        if (el.id === contactId) {
            data[idx] = { id: el.id, ...dataUpdate }
            updated = data
        }
    });
    fsPromises.writeFile(contactsPath, JSON.stringify(updated))
    return updated
}




module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
}



