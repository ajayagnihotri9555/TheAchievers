// routes/protected.js...
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const token = localStorage.getItem("token");

fetch("http://localhost:5000/api/profile", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
router.get("/profile", auth, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}!`, uid: req.user.uid });
});

module.exports = router;
