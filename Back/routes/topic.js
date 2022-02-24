const express = require("express");
const router = express.Router();

const topicCtrl = require("../controllers/topic");

router.get("/topics/:id", topicCtrl.getOneTopic);
router.get("/topics", topicCtrl.getAllTopics);

router.post("/topics", topicCtrl.createOneTopic);
router.put("/topics/:id", topicCtrl.updateOneTopic);
router.delete("/topics/:id", topicCtrl.deleteOneTopic);

module.exports = router;
