const Topic = require("../models/topic")
const User = require("../models/user")
const Message = require("../models/message")

// create one
exports.createOneTopic = (req, res) => {
    const topic = new Topic({
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id,
        creationDate: new Date(),
    })
    topic
        .save()
        .then(res.status(201).json({ message: "topic publish with success !" }))
        .catch((error) => res.status(400).json({ error }))
}

// get one
exports.getOneTopic = async (req, res) => {
    try {
        // first we get the topic witch dont have any nickname
        const topicNotEdited = await Topic.findOne({ _id: req.params.id })
        // we get topic author
        const user = await User.findById({ _id: topicNotEdited.user_id })
        if (!user) {
            // we create another topic with a generic nickname for the front
            const topic = {
                ...topicNotEdited.toObject(),
                nickname: "ancien utilisateur",
            }
            res.status(200).json({ topic })
        } else {
            // we create another topic including nickname for the front
            const topic = {
                ...topicNotEdited.toObject(),
                nickname: user.nickname,
            }
            res.status(200).json({ topic })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

// get all

exports.getAllTopics = async (req, res) => {
    try {
        // we get all the topic where at first there is not the user nickname
        const topicsWithoutNickname = await Topic.find()

        // we create a new array to include user nickname in every topic
        const topics = await Promise.all(
            topicsWithoutNickname.map(async (topic) => {
                // for every topic we find the author
                const user = await User.findById({ _id: topic.user_id })
                // then we add the author in the topic
                // if user has deleted his account
                if (!user) {
                    topic = {
                        ...topic.toObject(),
                        nickname: "ancien utilisateur",
                    }
                } else {
                    // we send with author nickname
                    topic = { ...topic.toObject(), nickname: user.nickname }
                }
                return topic
            })
        )

        // we send the new array to the front
        res.status(200).json({ topics })
    } catch (error) {
        console.log(error)
    }
}

// update one
exports.updateOneTopic = (req, res) => {
    Topic.updateOne(
        { _id: req.params.id },
        { title: req.body.title, description: req.body.description }
    )
        .then((topic) =>
            res
                .status(201)
                .json({ message: "topic updated with success !", topic })
        )
        .catch((error) => res.status(400).json({ error }))
}

// delete one
exports.deleteOneTopic = (req, res) => {
    try {
        // first we remove all messages from the topic
        Message.deleteMany({ topic_id: req.params.id }).then(() => {
            // and then we can delete the topic
            Topic.findByIdAndRemove({ _id: req.params.id }).then(() => {
                res.status(201).json({ message: " topic deleted !" })
            })
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}
