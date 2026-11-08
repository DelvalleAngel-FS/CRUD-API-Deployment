const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const animalRoutes = require("./routes/animalRoutes");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://onrender.com"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/animals", animalRoutes);

module.exports = app;
