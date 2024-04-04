import admin from "../Configurations/firebaseConfig.js";

const authMiddleware = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    if (!idToken)
      return res.status(401).json({ error: "Authorization token required" });
    const decodedToken = await admin.auth().verifyIdToken(idToken,true);
    req.body.userId = decodedToken.uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized User" });
  }
};

export default authMiddleware;
