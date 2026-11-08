require("dotenv").config();
const express = require("express");
const path = require("path");
const app = require("./app");
const connectDB = require("./db/config");

connectDB();

const PORT = process.env.PORT || 3000;

// Serve Static Frontend Assets when deployed to Production
if (process.env.NODE_ENV === "production") {
  // Directs express to look for static frontend build elements inside client/dist
  app.use(express.static(path.join(__dirname, "client", "dist")));

  // CHANGED: Fixed Express 5 path parameter validation syntax error
  app.get("(.*)", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
