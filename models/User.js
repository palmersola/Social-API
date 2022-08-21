const { Schema, model, SchemaTypes } = require("mongoose");

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
      unique: true,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    thoughts: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Thought"
      }
    ],
    friends: [
      {
        type: SchemaTypes.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    toJSON: {
      virtuals: true // include any virtual properties on a client side request
    }
  }
);

userSchema.virtual("friendCount").get(function() {
  return `${this.friends.length}`;
});

const User = model("User", userSchema);

module.exports = User;

// userSchema.virtual("thoughts").get(function() {
//   return `${this.thoughts}`;
// });

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
