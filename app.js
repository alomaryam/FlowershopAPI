const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const app = express();
const flowerRoutes = require("./API/flowers/routers");

app.use(cors());
app.use(express.json()); //instead of body parser
app.use(flowerRoutes);

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    await app.listen(8001, () => {
      console.log("The application is running on localhost:8001");
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};
run();
