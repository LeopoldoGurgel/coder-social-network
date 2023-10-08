// model for creation of thoughts

const { Schema, model } = require('mongoose'); 


const reactionSchema = new Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String, 
        required: true, 
        maxlength: 280, 
        trim: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => createdAt.toISOString()
    }
})


const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 280, 
        trim: true
    },
    createdAt: {
        type: Date,
        defaut: Date.now,
        get: (createdAt) => createdAt.toISOString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the number of elements within the reactions array.
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
