const mongoose = require("mongoose");

const topicSchema = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    user_id: { type: String, require: true },
    creationDate: { type: Date, require: true },
});

module.exports = mongoose.model("Topic", topicSchema);
