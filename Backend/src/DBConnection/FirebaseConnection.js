import admin from "firebase-admin";
import "dotenv/config";


if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error("❌ FIREBASE_SERVICE_ACCOUNT ENV not found!");
  process.exit(1);
}

let serviceAccount;

try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} catch (err) {
  console.error("❌ Invalid FIREBASE_SERVICE_ACCOUNT JSON");
  process.exit(1);
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "buybooks-455e6.appspot.com", // ✅ your Firebase bucket name
    });
    console.log("🔥 Firebase connected successfully");
  } catch (error) {
    console.error("❌ Firebase connection error : ", error.message);
  }
}

const bucket = admin.storage().bucket();
export { bucket };
