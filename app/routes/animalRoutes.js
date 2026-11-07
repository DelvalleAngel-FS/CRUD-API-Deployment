const express = require("express");
const router = express.Router();
const {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} = require("../controller/animalController");

router.get("/", getAllAnimals);
router.post("/", createAnimal);
router.get("/:id", getAnimalById);
router.patch("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);

module.exports = router;
