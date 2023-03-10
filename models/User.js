const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String, 
            unique: true, 
            required: true, 
            trim: true
        },
        email: {
            type: String, 
            required: true, 
            unique: true, 
            match: /.+\@.+\..+/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Virtual for getting a user's friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initializes our User model
const User = model('user', userSchema);

module.exports = User;