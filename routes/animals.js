const express = require("express");
const router = express.Router();

const Animal = require("../models/animal");

//Restful Endpoints
//GET, POST, PATCH, DELETE

const getAnimal = async (req, res, next) => {
  let animal;
  try {
    animal = await Animal.findById(req.params.id);
    if (animal === null) {
      return res.status(404).json({ message: "Animal not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.animal = animal;
  next();
};

//GET ALL
router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET ONE
router.get("/:id", getAnimal, async (req, res) => {
  res.json(res.animal);
});

//POST CREATE
router.post("/", async (req, res) => {
  const animal = new Animal({
    name: req.body.name,
    class: req.body.class,
  });
  try {
    const newAnimal = await animal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//PATCH UPDATE
router.patch("/:id", getAnimal, async (req, res) => {
  if (req.body.name != null) {
    res.animal.name = req.body.name;
  }
  if (req.body.class != null) {
    res.animal.class = req.body.class;
  }
  try {
    const updatedAnimal = await res.animal.save();
    res.json(updatedAnimal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete
router.delete("/:id", getAnimal, async (req, res) => {
  try {
    await res.animal.remove();
    res.json({ message: "Animal got removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
