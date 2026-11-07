const express = require("express");
const morgan = require("morgan");
const app = express();
const animalRoutes = require("./routes/animalRoutes");

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running", success: true });
});

app.use("/animals", animalRoutes);

module.exports = app;
