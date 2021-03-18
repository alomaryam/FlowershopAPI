const { Flower } = require("../../db/models");

exports.Home = (request, response) => {
  response.json({ message: "hello world!" });
};

//list flowers

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

//add flower

exports.flowerCreate = async (request, response) => {
  try {
    const newFlower = await Flower.create(request.body);
    response.status(201).json(newFlower);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//update flowers

exports.flowerUpdate = async (request, response) => {
  const { flowerID } = request.params;
  try {
    const foundFlower = await Flower.findByPk(flowerID);
    if (foundFlower) {
      await foundFlower.update(request.body);
      response.status(204).end();
    } else {
      response.status(404).json({ message: "Flower not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//delete flowers

exports.flowerDelete = async (request, response) => {
  const { flowerID } = request.params;
  try {
    const foundFlower = await Flower.findByPk(flowerID);
    if (foundFlower) {
      await foundFlower.destroy();
      response.status(204).end();
    } else {
      response.status(404).json({ message: "Flower not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
