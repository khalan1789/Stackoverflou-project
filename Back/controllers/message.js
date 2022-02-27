const Message = require("../models/message");

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
            res
                .status(201)
                .json({ message: "commentaire publié avec succès !" })
        )
        .catch((error) => res.status(400).json({ error }));
};

// update one
exports.updateOneMessage = (req, res) => {
    Message.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body, content: req.body.content }
    )
        .then((comment) => res.status(200).json({ comment }))
        .catch((error) => res.status(400).json({ error }));
};

// delete one
exports.deleteOneMessage = (req, res) => {
    Message.findOneAndDelete(
        { _id: req.params.id },
        { user_id: req.body.userId }
    )
        .then(() =>
            res.status(201).json({ message: " message supprimé avec succès !" })
        )
        .catch((error) => res.status(400).json({ error }));
};
