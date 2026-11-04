const express = require("express");
const router = express.Router();

const Animal = require("../models/animal");

//Restful Endpoints
//GET, POST, PATCH, DELETE

//GET ALL
router.get("/", (req, res) => {
  res.send("All Animals Route");
});

//GET ONE
router.get("/:id", (req, res) => {
  res.send(`Animal ID: ${req.params.id}`);
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

//Patch Update
router.patch("/:id", (req, res) => {
  res.send(`Animal ID: ${req.params.id}`);
});

//Delete
router.delete("/:id", (req, res) => {
  res.send(`Animal ID: ${req.params.id}`);
});

module.exports = router;
