const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    content: { type: String, require: true },
    topic_id: { type: String, require: true },
    user_id: { type: String, require: true },
    creationDate: { type: String, require: true },
});

module.exports = mongoose.model("Message", messageSchema);
