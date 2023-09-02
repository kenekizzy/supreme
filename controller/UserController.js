const User = require("../model/UserModel")

//Create a new user controller
const createUser = async ( req, res) => {
    //Destructuring the user details from the request body
    const { name, email} = req.body
    try {
        //Checking if the email provided is an existing email
        const existingEmail = await User.findOne({email})
        if(existingEmail) return res.status(400).json("This user already exists")

        //Creating a new user and saving the user
        const newUser = new User({name, email})
        const user = await newUser.save()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        //Getting all the avaialable users from the DB
        const users = await User.find()
        if(users.length <= 0) return res.status(200).json("No current Users")

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)   
    }
}

module.exports = { createUser, getAllUsers}