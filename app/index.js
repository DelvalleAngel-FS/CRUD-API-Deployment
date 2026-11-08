const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const animalRoutes = require("./routes/animalRoutes");

app.use(
  cors({
    origin: "http://localhost:5173", // Allows your React development site to read data
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running", success: true });
});

app.use("/animals", animalRoutes);

module.exports = app;
