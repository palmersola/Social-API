const { Schema, model, SchemaTypes } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
      // required: true
    }
  },
  {
    toJSON: {
      virtuals: true // include any virtual properties on a client side request
    }
  }
);

// userSchema.virtual("thoughts").get(function() {
//   return `${this.thoughts}`;
// });

// userSchema.virtual("friends").get(function() {
//   return `${this.friends}`;
// });

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;

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
