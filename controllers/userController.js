const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID' })
                : res.json(user)
            )
        .catch((err) => res.status(500).json(err));
    },
    // Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                    !user
                        ? res.status(404).json({ message: "No user found with that ID" })
                        : res.json({ message: 'User has been deleted successfully' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add a friend to a user's friends
    addFriend(req, res) {
        console.log('You are adding a friend');
        console.log('req.body');
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove a friend from a user's friends
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
};