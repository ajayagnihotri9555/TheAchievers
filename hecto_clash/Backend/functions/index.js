const functions = require("firebase-functions");
const admin = require("firebase-admin");
const token = await auth.currentUser.getIdToken();

admin.initializeApp();

exports.protectedEndpoint = functions.https.onRequest((req, res) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      res.send("Protected content");
    })
    
    .catch((error) => {
      res.status(401).send("Unauthorized");
    });
});
const response = await fetch("http://localhost:5000/api/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  console.log("Backend response:", data);
  
