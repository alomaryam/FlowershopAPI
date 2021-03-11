const express = require("express");
let flowers = require("./flowers");
const cors = require("cors");
const slugify = require("slugify");

const app = express();

app.use(cors());
app.use(express.json()); //instead of body parser

app.use("/images", express.static("images"));

app.get("/", (request, response) => {
  response.json({ message: "hello world!" });
});

app.get("/flowers", (request, response) => {
  response.json(flowers);
});

// app.delete("/flowers/1", (req, res) => {
//   flowers = flowers.filter((flower) => flower.id !== 1);
//   console.log("flowers", flowers);
// });

// app.delete("/flowers/3", (req, res) => {
//   flowers = flowers.filter((flower) => flower.id !== 3);
//   console.log("flowers", flowers);
// });

app.delete("/flowers/:flowerID", (request, response) => {
  const { flowerID } = request.params;
  const foundFlower = flowers.find((flower) => flower.id === +flowerID);
  if (foundFlower) {
    flowers = flowers.filter((flower) => flower !== foundFlower);
    // console.log("flowers", flowers);
    response.status(204).end();
  } else {
    response.status(404);
    response.json({ message: "Flower not found" });
  }
});

app.post("/flowers", (request, response) => {
  const id = flowers[flowers.length - 1].id + 1;
  const slug = slugify(request.body.name, { lower: true });
  const newFlower = { id, slug, ...request.body };
  flowers.push(newFlower);
  response.status(201).json(newFlower);
});

app.listen(8001, () => {
  console.log("The application is running on localhost:8001");
});
