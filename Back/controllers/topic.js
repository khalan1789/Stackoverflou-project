const Topic = require("../models/topic");

// create one
exports.createOneTopic = (req, res, next) => {
    // const topicObject = JSON.parse(req.body);
    // // delete topicObject._id;
    // const topic = new Topic({
    //     title: topicObject.title,
    //     description: topicObject.description,
    //     user_id: topicObject.user_id,
    //     creationDate: topicObject.creationDate,
    // });

    const topic = new Topic({
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id,
        creationDate: req.body.creationDate,
    });
    topic
        .save()
        .then(res.status(201).json({ message: "article publié avec succès !" }))
        .catch((error) => res.status(400).json({ error }));
};

// get one
exports.getOneTopic = (req, res, next) => {
    Topic.findOne({ _id: req.params.id })
        .then((topic) => res.status(200).json(console.log(topic)))
        .catch((error) => res.status(400).json({ error }));
};

// get all
exports.getAllTopics = (req, res, next) => {
    Topic.find()
        .then((topics) => res.status(200).json({ topics }))
        .catch((error) => res.status(400).json({ error }));
};

// update one
exports.updateOneTopic = (req, res, next) => {
    Topic.findOneAndUpdate(
        { _id: req.params._id },
        { description: req.body.description }
    )
        .then((topic) => res.status(200).json({ topic }))
        .catch((error) => res.status(400).json({ error }));
};

// delete one
exports.deleteOneTopic = (req, res, next) => {
    const id = req.body.id;
    Topic.findByIdAndRemove(id)
        .then(() =>
            res.status(201).json({ message: " article supprimé avec succès !" })
        )
        .catch((error) => res.status(400).json({ error }));
};
