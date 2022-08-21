const { Schema, model, SchemaTypes } = require("mongoose");

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
      default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
      // required: true
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Reaction"
      }
    ]
  },
  {
    toJSON: {
      virtuals: true // include any virtual properties on a client side request
    }
  }
);

thoughtSchema.virtual("reactionCount").get(function() {
  return `${this.reactions.length}`;
});

// userSchema.virtual("friends").get(function() {
//   return `${this.friends}`;
// });

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

//   .set(function(val) {
//     const split = val.trim().split(" ");
//     this.set({ first: split[0], last: split[1] });
//   });

// user.deleteMany({}).then(() => user.insertMany([
//   {
//     first: 'JD',
//     last: 'Tadlock'
//   },
//   {
//     first: 'Sarah',
//     last: 'Tadlock'
//   }
// ])).then(() => console.log('inserted'))
