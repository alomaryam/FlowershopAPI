const express = require("express");
const router = express.Router();
const { Home, flowerList, flowerDelete, flowerPost } = require("./controllers");

router.use("../images", express.static("images"));

router.get("/", Home);

router.get("/flowers", flowerList);

router.delete("/flowers/:flowerID", flowerDelete);

router.post("/flowers", flowerPost);

module.exports = router;
