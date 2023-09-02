const router = require("express").Router()

const { getAllTransactions, getSingleTransaction } = require("../controller/TransactionController")

router.get("/get-all", getAllTransactions)

router.get("/get-single/:id", getSingleTransaction)

module.exports = router