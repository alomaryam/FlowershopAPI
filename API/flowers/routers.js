const express = require("express");
const router = express.Router();
const {
  Home,
  flowerList,
  flowerCreate,
  flowerUpdate,
  flowerDelete,
} = require("./controllers");

router.use("../images", express.static("images"));

router.get("/", Home);

router.get("/flowers", flowerList);

router.post("/flowers", flowerCreate);

router.put("/flowers/:flowerID", flowerUpdate);

router.delete("/flowers/:flowerID", flowerDelete);

module.exports = router;
