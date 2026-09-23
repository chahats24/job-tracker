const jwt = require("jsonwebtoken");
const User = require("../models/User");
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      error: "Invalid authorization format",
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: id }).select("_id");
    if (!req.user) {
    return res.status(401).json({
        error: 'User not found'
    });
}
    next();
  } catch (err) {
    res.status(401).json({ error: "Request not authorized" });
  }
};
module.exports = requireAuth;
