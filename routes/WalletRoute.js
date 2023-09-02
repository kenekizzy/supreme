const router = require("express").Router()

const { createWallet, getAllWallets, getSingleWallet, sendWalletFunds } = require("../controller/WalletController")

router.post("/create-wallet", createWallet)

router.get("/get-all", getAllWallets)

router.get("/get-single/:id", getSingleWallet)

router.post("/transfer-funds", sendWalletFunds)

module.exports = router