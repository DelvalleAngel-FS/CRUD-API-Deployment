const Animal = require("../models/Animal");

const getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json({
      data: animals,
      success: true,
      message: `${req.method} - request to Animal endpoint`,
    });
  } catch ({ message }) {
    res.status(500).json({ success: false, message });
  }
};

const getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    res.status(200).json({
      data: animal,
      success: true,
      message: `${req.method} - request to Animal endpoint`,
    });
  } catch ({ message }) {
    res.status(500).json({ success: false, message });
  }
};

const createAnimal = async (req, res) => {
  try {
    const animal = await Animal.create(req.body);
    res.status(201).json({
      data: animal,
      success: true,
      message: `${req.method} - request to Animal endpoint`,
    });
  } catch ({ message }) {
    res.status(500).json({ success: false, message });
  }
};

const updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      data: animal,
      success: true,
      message: `${req.method} - request to Animal endpoint`,
    });
  } catch ({ message }) {
    res.status(500).json({ success: false, message });
  }
};

const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findByIdAndDelete(id);
    res.status(200).json({
      data: animal,
      success: true,
      message: `${req.method} - request to Animal endpoint`,
    });
  } catch ({ message }) {
    res.status(500).json({ success: false, message });
  }
};

module.exports = {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};
