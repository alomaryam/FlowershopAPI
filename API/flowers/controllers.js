const { Flower } = require("../../db/models");
let flowers = require("../../flowers");
const slugify = require("slugify");

exports.Home = (request, response) => {
  response.json({ message: "hello world!" });
};

exports.flowerList = async (request, response) => {
  try {
    const flower = await Flower.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    response.status(200).json(flower);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

exports.flowerDelete = (request, response) => {
  const { flowerID } = request.params;
  const foundFlower = flowers.find((flower) => flower.id === +flowerID);
  if (foundFlower) {
    flowers = flowers.filter((flower) => flower !== foundFlower);
    response.status(204).end();
  } else {
    response.status(404);
    response.json({ message: "Flower not found" });
  }
};

exports.flowerPost = (request, response) => {
  const id = flowers[flowers.length - 1].id + 1;
  const slug = slugify(request.body.name, { lower: true });
  const newFlower = { id, slug, ...request.body };
  flowers.push(newFlower);
  response.status(201).json(newFlower);
};
