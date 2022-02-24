const express = require("express");
const router = express.Router();

// import user controller for route
const userCtrl = require("../controllers/user");

// create user route
router.post("/signup", userCtrl.signup);

// login user route
router.post("/login", userCtrl.login);

module.exports = router;
