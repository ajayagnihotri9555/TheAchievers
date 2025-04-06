// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const protectedRoutes = require("./routes/protected");

app.use(cors());
app.use(express.json());

app.use("/api", protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
