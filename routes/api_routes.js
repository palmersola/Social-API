const api_router = require("express").Router();
const User = require("../models/User");
const Thought = require("../models/Thought");
const Reaction = require("../models/Reaction");

// Get all users
api_router.get("/users", async (req, res) => {
  const users = await User.find().populate("username");

  res.send(users);
});

// Get user by id
api_router.get("/user", async (req, res) => {
  const user_id = req.body._id;
  const user = await User.findOne({ _id: user_id });

  res.send(user);
});

// Create a user
api_router.post("/user", async (req, res) => {
  const { username, email } = req.body;
  const newUser = await User.create({ username, email });
  // newUser.save();
  res.send(newUser);
});

// Update a user by id
api_router.put("/user", async (req, res) => {
  const { _id, username, email } = req.body;
  const newUser = await User.findOne({ _id: _id });
  await newUser.updateOne({ $set: { username, email } });
  newUser.save();
  res.send(newUser);
});

// Delete a user
api_router.delete("/user/:id", async (req, res) => {
  const deleted_user = await User.deleteOne({ _id: req.params.id });
  res.send(`user has been deleted`);
});

// Add to friends array
api_router.post("/user/:userId/friends/:friendId", async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId });
  const friendId = await User.findOne({ _id: req.params.friendId });

  user.friends.push(friendId);
  user.save();

  res.send(user);
});

// Delete from friends array
api_router.delete("/user/:userId/friends/:friendId", async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId });
  const friendId = await User.findOne({ _id: req.params.friendId });

  user.friends.remove(friendId);
  user.save();

  res.send(user);
});

// Get all thoughts
api_router.get("/thoughts", async (req, res) => {
  const thoughts = await Thought.find().populate("username");

  res.send(thoughts);
});

//Get thought by Id
api_router.get("/thought", async (req, res) => {
  const thought_id = req.body._id;
  const thought = await Thought.findOne({ _id: thought_id });

  res.send(thought);
});

//Create thought
api_router.post("/thought", async (req, res) => {
  const { thoughtText, username } = req.body;
  const newThought = await Thought.create({ thoughtText, username });
  const user = await User.findOne({ username: username });
  user.thoughts.push(newThought._id);

  user.save();
  res.send(newThought);
});

// Update thought by id
api_router.put("/thought", async (req, res) => {
  const { _id, thoughtText, username } = req.body;
  const thought = await Thought.findOne({ _id: _id });
  const oldUser = thought.username;
  if (oldUser !== username) {
    oldUser.thoughts.pop(thought);
    oldUser.save();
  }

  await thought.updateOne({ $set: { thoughtText, username } });
  thought.save();

  const user = await User.findOne({ username: username });
  user.thoughts.push(thought._id);
  user.save();

  res.send(thought);
});

//Delete thought by id
api_router.delete("/thoughts/:thoughtId", async (req, res) => {
  const deleted_thought = await Thought.deleteOne({
    _id: req.params.thoughtId
  });
  res.send("thought has been deleted");
});

//Add thought reaction
api_router.post("/thoughts/:thoughtId/reactions", async (req, res) => {
  const { reactionBody, username } = req.body;
  const thought = await Thought.findOne({ _id: req.params.thoughtId });
  const reaction = await Reaction.create({
    reactionBody: reactionBody,
    username: username
  });

  thought.reactions.push(reaction._id);
  thought.save();

  res.send(reaction);
});

//Delete reaction
api_router.delete("/thoughts/:thoughtId/reactions", async (req, res) => {
  const { reactionId } = req.body;
  const deleted_reaction = await Reaction.deleteOne({ _id: reactionId });
  const thought_for_delete = await Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    {
      $pull: {
        reactions: reactionId
      }
    }
  );
  res.json(thought_for_delete);
});
module.exports = api_router;
