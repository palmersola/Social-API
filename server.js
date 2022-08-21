const express = require("express");
const db = require("./config/connection");

const api_routes = require("./routes/api_routes");
const PORT = process.env.PORT || 3001;
const app = express();
// const path = require("path");

// app.use(express.static(path.join(__dirname, "./routes")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", api_routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
