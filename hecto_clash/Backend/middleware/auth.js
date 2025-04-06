// backend/middleware/auth.js
const admin = require("../firebaseAdmin");
console.log("Authenticated user UID:", decodedToken.uid);


module.exports = async function (req, res, next) {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (req.user.role !== "admin") {
    return res.status(403).send("Admins only");
  }
  
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send("Forbidden");
  }
};
