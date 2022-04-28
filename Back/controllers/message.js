const Message = require("../models/message");
const User = require("../models/user");

// get all
exports.getAllMessage = (req, res, next) => {
    Message.find()
        .then((messages) => res.status(200).json({ messages }))
        .catch((error) => res.status(400).json({ error }));
};

// get one
exports.getOneMessage = (req, res, next) => {
    Message.findOne({ _id: req.params.id })
        .then((comment) => res.status(200).json({ comment }))
        .catch((error) => res.status(400).json({ error }));
};

// create one
exports.createMessage = (req, res, next) => {
    const message = new Message({
        content: req.body.content,
        topic_id: req.body.topic_id,
        user_id: req.body.user_id,
        creationDate: new Date(),
    });
    message
        .save()
        .then(
            res.status(201).json({ message: "comment publish with success !" })
        )
        .catch((error) => res.status(400).json({ error }));
};

// update one
exports.updateOneMessage = (req, res) => {
    Message.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, content: req.body.content }
    )
        .then((comment) =>
            res.status(200).json({ comment, message: "comment updated !" })
        )
        .catch((error) => res.status(400).json({ error }));
};

// delete one
exports.deleteOneMessage = (req, res) => {
    Message.findOneAndDelete(
        { _id: req.params.id },
        { user_id: req.body.userId }
    )
        .then(() =>
            res.status(201).json({ message: " comment deleted with success !" })
        )
        .catch((error) => res.status(400).json({ error }));
};

// all messages from one topic

exports.getAllTopicMessage = async (req, res) => {
    const topic_id = req.params.id;
    const messages = await Message.find({ topic_id: topic_id });

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
    console.log("id author : " + Message.user_id);
    console.log("comment finds ? : " + messages);
    res.status(200).json({ messages });
};
