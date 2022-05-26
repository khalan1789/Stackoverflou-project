const express = require("express")
const router = express.Router()
const authWithToken = require("../middleware/authWithToken")

// import user controller for route
const userCtrl = require("../controllers/user")

// create user route
router.post("/signup", userCtrl.signup)

// login user route
router.post("/login", userCtrl.login)

// check token user route
router.get("/auth/checkToken", authWithToken, userCtrl.checkToken)

// get the user after check
router.get("/user/", authWithToken, userCtrl.getOneUser)

// update user
router.put("/user/:id", authWithToken, userCtrl.updateOneUser)

// delete user
router.delete("/user/:id", authWithToken, userCtrl.deleteOneUser)

module.exports = router
