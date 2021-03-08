const express = require("express");
const flowers = require("./flowers");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "hello world!" });
});

app.get("/flowers", (req, res) => {
  res.json(flowers);
});

app.listen(8001, () => {
  console.log("The application is running on localhost:8001");
});
