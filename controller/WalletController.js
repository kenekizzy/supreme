const Wallet = require("../model/WalletModel")
const User = require("../model/UserModel")
const Transaction = require("../model/TransactionModel")
const { v4: uuidv4 } = require('uuid');

//Creating a Wallet foran existing user
const createWallet = async (req, res) => {
    const { userId, walletType, monthlyInterestRate} = req.body
    try {
        //Checking if there is an existing user 
        const existingUser = await User.findById(userId)
        if(!existingUser) return res.status(400).json("Invalid User")

        //Creating a wallet id and saving the user name to be stored in the Wallet DB
        const walletId = uuidv4()
        const name = existingUser.name
        const newWallet = await new Wallet ({ userId, name, walletType, monthlyInterestRate, walletId})
        const wallet = await newWallet.save()

        //Saving the wallet id to the existing user
        existingUser.wallets.push(walletId)
        await existingUser.save()

        //Returning the Wallet Details 
        res.status(200).json(wallet)

    } catch (error) {
        res.status(500).json(error)
    }
}

//Creating an endpoint for fetching all the the wallets
const getAllWallets = async (req, res) => {
    try {
        //Checking for existing wallets and returning thevalues if they exist
        const wallets = await Wallet.find()
        if(wallets.length <= 0) return res.status(200).json("No Wallet Saved")

        res.status(200).json(wallets)
    } catch (error) {
        res.status(500).json(error)
    }
}

//Creating an endpoint to get a single wallet with the walletId ()
const getSingleWallet = async (req, res) => {
    //Getting the wallet id as a parameter passed
    const walletId = req.params.id
    try {
        //Checking if the wallet exists and sending the appropraite message
        const existingWallet = await Wallet.findOne({walletId})
        if(existingWallet.length <= 0) return res.status(400).json("No existing Wallet Id")

        res.status(200).json(existingWallet)
    } catch (error) {
        res.status(500).json(error)
    }
}

//Sending amount between two different wallets
const sendWalletFunds = async (req, res) => {
    try {
        const { fromWalletId, toWalletId, amount } = req.body;
    
        // Check if both accounts exist
        const existingOutgoingWallet = await Wallet.findOne({walletId: fromWalletId});
        const existingIncomingWallet = await Wallet.findOne({walletId: toWalletId});
    
        if (!existingOutgoingWallet || !existingIncomingWallet) {
          return res.status(404).json({ error: 'Invalid Wallet Id Provided' });
        }
    
        // Check if the fromAccount has sufficient balance
        if (existingOutgoingWallet.accountBalance < amount) {
          return res.status(400).json({ error: 'Insufficient balance' });
        }
    
        // Perform the money transfer
        existingOutgoingWallet.accountBalance -= amount;
        existingIncomingWallet.accountBalance += amount;
    
        // Save the updated account balances and create a transaction record
        await existingOutgoingWallet.save();
        await existingIncomingWallet.save();
    
        const transaction = new Transaction({
          outgoingWalletId: fromWalletId,
          incomingWalletId: toWalletId,
          amount,
        });
    
        await transaction.save();
    
        return res.status(200).json({ message: 'Money transferred successfully' });
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = { createWallet, getAllWallets, getSingleWallet, sendWalletFunds}