const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            defaut: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

// Virtual for getting the reation count on a particular thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initializes our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;