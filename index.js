
const contacts = require('./contacts')
const argv = require('yargs').argv;

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contactsList = await contacts.listContacts()
            console.table(contactsList)
            break;

        case 'get':
            const getUser = await contacts.getContactById(id)
            console.log(getUser)
            break;

        case 'add':
            await contacts.addContact(name, email, phone)
            console.log(`contact ${name} was added`)
            break;

        case 'remove':
            await contacts.removeContact(id)
            console.log(`contact with id-${id} was removed`)
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);

