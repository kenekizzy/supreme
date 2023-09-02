const mongoose = require("mongoose")

//Creating a Transaction Model to track the transactions made between different id's and retrieve them when needed
const transactionSchema = new mongoose.Schema({
   outgoingWalletId: {
    type: String,
    required: true
   },
   incomingWalletId: {
    type: String,
    required: true
   }, 
   amount: {
    type: Number,
    required: true
   }
}, {timestamps: true})

module.exports = mongoose.model("transaction", transactionSchema)