const express = require("express");
let flowers = require("./flowers");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "hello world!" });
});

app.get("/flowers", (req, res) => {
  res.json(flowers);
});

// app.delete("/flowers/1", (req, res) => {
//   flowers = flowers.filter((flower) => flower.id !== 1);
//   console.log("flowers", flowers);
// });

// app.delete("/flowers/3", (req, res) => {
//   flowers = flowers.filter((flower) => flower.id !== 3);
//   console.log("flowers", flowers);
// });

app.delete("/flowers/:flowerID", (req, res) => {
  const { flowerID } = req.params;
  const foundFlower = flowers.find((flower) => flower.id === +flowerID);
  if (foundFlower) {
    flowers = flowers.filter((flower) => flower !== foundFlower);
    // console.log("flowers", flowers);
    res.status(204).end();
  } else {
    res.status(404);
    res.json({ message: "Flower not found" });
  }
});

app.listen(8001, () => {
  console.log("The application is running on localhost:8001");
});
