const express = require("express");
const router = express.Router();

// call to middleware to check authorisations
const auth = require("../middleware/auth");

// import logic about message's routes
const messageCtrl = require("../controllers/message");

router.get("/", messageCtrl.getAllMessage);
router.get("/by_topic/:id", messageCtrl.getAllTopicMessage);
router.get("/:id", messageCtrl.getOneMessage);

router.post("/", auth, messageCtrl.createMessage);
router.put("/:id", auth, messageCtrl.updateOneMessage);
router.delete("/:id", auth, messageCtrl.deleteOneMessage);

module.exports = router;
