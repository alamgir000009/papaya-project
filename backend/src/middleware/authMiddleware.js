const jwt = require("jsonwebtoken");
const User = require("../user/model");

exports.authMiddleware = () => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "invalid Access" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded) {
        const user = User.findById(decoded.id).select("-password");
        if (!user) {
          return res.status(403).json({ msg: "Access denied" });
        }
      } else {
        return res.status(403).json({ msg: "Access denied" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ msg: "Invalid token." });
    }
  };
};
