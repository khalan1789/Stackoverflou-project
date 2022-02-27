const Topic = require("../models/topic");

// create one
exports.createOneTopic = (req, res) => {
    const topic = new Topic({
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id,
        creationDate: new Date(),
    });
    topic
        .save()
        .then(res.status(201).json({ message: "topic publish with success !" }))
        .catch((error) => res.status(400).json({ error }));
};

// get one
exports.getOneTopic = (req, res) => {
    Topic.findOne({ _id: req.params.id })
        .then((topic) => res.status(200).json({ topic }))
        .catch((error) => res.status(400).json({ error }));
};

// get all
exports.getAllTopics = (req, res) => {
    Topic.find()
        .then((topics) => res.status(200).json({ topics }))
        .catch((error) => res.status(400).json({ error }));
};

// update one
exports.updateOneTopic = (req, res) => {
    Topic.updateOne(
        { _id: req.params.id },
        { ...req.body, description: req.body.description }
    )
        .then((topic) =>
            res
                .status(200)
                .json({ message: "topic updated with success !", topic })
        )
        .catch((error) => res.status(400).json({ error }));
};

// delete one
exports.deleteOneTopic = (req, res) => {
    const id = req.body.id;
    Topic.findByIdAndRemove(id)
        .then(() => res.status(201).json({ message: " topic deleted !" }))
        .catch((error) => res.status(400).json({ error }));
};
