// backend/firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // downloaded from Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
admin.auth().setCustomUserClaims(uid, { role: "admin" });
admin.auth().getUser(uid)
  .then((userRecord) => {
    // User record available here
    console.log("Successfully fetched user data:", userRecord.toJSON());
  })
  .catch((error) => {
    console.log("Error fetching user data:", error);
  });
module.exports = admin;
