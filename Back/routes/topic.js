const express = require("express");
const router = express.Router();

// call to middleware to check authorisations
const auth = require("../middleware/auth");

// import logic about topic's routes
const topicCtrl = require("../controllers/topic");

router.get("/:id", topicCtrl.getOneTopic);
router.get("/", topicCtrl.getAllTopics);

router.post("/", auth, topicCtrl.createOneTopic);
router.put("/:id", auth, topicCtrl.updateOneTopic);
router.delete("/:id", auth, topicCtrl.deleteOneTopic);

module.exports = router;
