const router = require("express").Router()

const { createUser, getAllUsers } = require("../controller/UserController")

router.post("/add-user", createUser)

router.get("/get-all-user", getAllUsers)

module.exports = router