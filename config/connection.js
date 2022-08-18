const mongoose = require("mongoose");

// Wrap Mongoose around local connection to MongoDB
mongoose.connect("mongodb://localhost:3333", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Export connection
module.exports = mongoose.connection;
