const Transaction = require("../model/TransactionModel")

//Getting all the transaction records
const getAllTransactions = async (req, res) => {
    try {
       const existingTransactions = await Transaction.find()
       if(existingTransactions.length <= 0) return res.status(200).json("No Transaction has been made") 

       res.status(200).json(existingTransactions)
    } catch (error) {
        res.status(500).json(error)
    }
}

//Getting a single transaction record with the transaction id
const getSingleTransaction = async (req, res) => {
    const transactionId = req.params.id
    try {
        const existingTransaction = await Transaction.findById(transactionId)
        if(existingTransaction.length <= 0) return res.status(400).json("Invalid TransactionId")

        res.status(200).json(existingTransaction)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { getAllTransactions, getSingleTransaction}