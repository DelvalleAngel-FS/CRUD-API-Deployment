const express = require("express");
const router = express.Router();

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
router.post("/", (req, res) => {
  res.send(`Animal ID: ${req.params.id}`);
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
