import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  const jwtKey = process.env.JWT_KEY || process.env.JWT_SECRET;

  if (!token) return res.status(401).json({ message: "Admin token is required" });
  if (!jwtKey) return res.status(500).json({ message: "JWT key is not configured" });

  try {
    const payload = jwt.verify(token, jwtKey);
    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.admin = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired admin token" });
  }
};

export default adminAuth;