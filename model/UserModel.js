const mongoose = require("mongoose")

//Creating a User Model for the Users that will be stored in the DB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    wallets: {
        type: Array,
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model("user", userSchema)