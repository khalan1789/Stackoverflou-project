const express = require("express");
const router = express.Router();

const messageCtrl = require("../controllers/message");

router.get("/", messageCtrl.getAllMessage);
router.get("/:id", messageCtrl.getOneMessage);

router.post("/", messageCtrl.createMessage);

module.exports = router;
