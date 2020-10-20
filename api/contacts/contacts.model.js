const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subscription: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, default: "" },
})

ContactSchema.plugin(mongoosePaginate);

module.exports = model('Contact', ContactSchema)