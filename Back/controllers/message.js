const message = require("../models/message")
const Message = require("../models/message")
const User = require("../models/user")

// get all
// first with all messages
// exports.getAllMessage = (req, res, next) => {
//     Message.find()
//         .then((messages) => res.status(200).json({ messages }))
//         .catch((error) => res.status(400).json({ error }));
// };
// try to get user nickname with all messages
exports.getAllMessage = async (req, res, next) => {
    try {
        const MessagesNotEdited = await Message.find()
        const messages = await Promise.all(
            MessagesNotEdited.map(async (message) => {
                const user = await User.find({ _id: message.user_id })
                message = { ...message, nickname: user.nickname }
                return message
            })
        )
        res.status(200).json({ messages })
    } catch (error) {
        console.log(error)
    }
}

// get one
exports.getOneMessage = (req, res, next) => {
    Message.findById({ _id: req.params.id })
        .then((comment) => res.status(200).json({ comment }))
        .catch((error) => res.status(400).json({ error }))
}

// create one
exports.createMessage = (req, res, next) => {
    const message = new Message({
        content: req.body.content,
        topic_id: req.body.topic_id,
        user_id: req.body.user_id,
        creationDate: new Date(),
    })
    message
        .save()
        .then(
            res.status(201).json({ message: "comment publish with success !" })
        )
        .catch((error) => res.status(400).json({ error }))
}

// update one
exports.updateOneMessage = (req, res) => {
    Message.findOneAndUpdate(
        { _id: req.params.id },
        { content: req.body.content }
    )
        .then((comment) =>
            res.status(201).json({ comment, message: "comment updated !" })
        )
        .catch((error) => res.status(400).json({ error }))
}

// delete one
exports.deleteOneMessage = (req, res) => {
    Message.findOneAndDelete(
        { _id: req.params.id },
        { user_id: req.body.userId }
    )
        .then(() =>
            res.status(201).json({ message: " comment deleted with success !" })
        )
        .catch((error) => res.status(400).json({ error }))
}

// all messages from one topic

exports.getAllTopicMessage = async (req, res) => {
    const topic_id = req.params.id
    try {
        // get all messages from the topic
        const MessagesNotEdited = await Message.find({ topic_id: topic_id })

        // then we map array received to add the message's user in a new array
        const messages = await Promise.all(
            MessagesNotEdited.map(async (message) => {
                const user = await User.findById({ _id: message.user_id })
                // if an author is deleted
                if (!user) {
                    message = {
                        ...message.toObject(),
                        nickname: "ancien utilisateur",
                    }
                } else {
                    message = {
                        ...message.toObject(),
                        nickname: user.nickname,
                    }
                }
                return message
            })
        )
        // we send the new array including user nickname to the front
        res.status(200).json({ messages })
    } catch (error) {
        console.log(error)
    }

    // // search nickname author
    // const comments = await Message.find({ topic_id: topic_id });
    // const topicAuthor = comments.map((user_id) => {
    //     User.findById(user_id)
    //     .then(
    //         if(!User){
    //             return nickname = "ancien utilisatuer"
    //         }else{
    //             return nickname
    //         }
    //     )
    //     .catch(err => )
    // })
}
