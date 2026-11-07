const express = require("express");
const router = express.Router();
const animalRoutes = require("./animalRoutes");

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `${req.method} - Request made` });
});

router.use("/animal", animalRoutes);

module.exports = router;
