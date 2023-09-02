const express = require("express")

const cors = require("cors")

const mongoose = require("mongoose")

const userRoutes = require("./routes/UserRoute")

const walletRoutes = require("./routes/WalletRoute")

const transactionRoutes = require("./routes/TransactionRoute")

require("dotenv").config()

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/user", userRoutes)

app.use("/api/wallet", walletRoutes)

app.use("/api/transaction", transactionRoutes)

const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })