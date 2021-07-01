const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        // minLength: 5,
        maxLength: 14
    },
    login_token: {
        type: String,
    },
    Rememberlogin: {
        type: Boolean,
        required: true,
    },
    date: { type: Date, required: true }

},
{
    timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at'
})

module.exports = mongoose.model('User', userSchema)

