const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const UserModel = new Schema({
    email: String,
    password: String,
    subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free"
    },
    token: String
})

UserModel.plugin(mongoosePaginate);



module.exports = model('User', UserModel)