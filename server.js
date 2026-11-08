require("dotenv").config();
const express = require("express");
const path = require("path");
const app = require("./app");
const connectDB = require("./db/config");

connectDB();

const PORT = process.env.PORT || 3000;

// ... All your DB connections and app routes must happen ABOVE this block ...

// Serve Static Frontend Assets when deployed to Production
if (process.env.NODE_ENV === "production") {
  // 1. Mount the folder containing your compiled index.html and compiled css/js assets
  app.use(express.static(path.join(__dirname, "client", "dist")));

  // 2. The global catch-all route MUST be the absolute last handler in your server
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
