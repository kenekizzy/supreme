const mongoose = require("mongoose")

//Creating a Wallet Model that would be stored in the DB
const walletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    accountBalance: {
        type: Number,
        required: true,
        default: 0
    },
    walletType: {
        type: String,
        required: true
    },
    monthlyInterestRate: {
        type: Number,
        required: true
    },
    walletId: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("wallet", walletSchema)