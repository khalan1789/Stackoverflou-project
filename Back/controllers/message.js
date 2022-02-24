const Message = require("../models/message");

// get all
exports.getAllMessage = (req, res, next) => {
    Message.find()
        .then((messages) => res.status(200).json({ messages }))
        .catch((error) => res.status(400).json({ error }));
};
// get one
exports.getOneMessage = (req, res, next) => {
    // // version query comme sur mongoose doc
    // const query = Message.where({ _id: req.params.id });
    // query.findOne((err, message) => {
    //     if (err) {
    //         throw err;
    //     }
    //     if (message) {
    //         res.status(200).json({ message });
    //     }
    // });

    // Version plus classique
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
        creationDate: req.body.creationDate,
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
exports.updateOneMessage = (req, res, next) => {
    Message.findByIdAndUpdate();
};
// delete one
