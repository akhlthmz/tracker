const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Get token from the header
  const token = req.header("x-auth-token");
  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token , authorization denied" });
  }

  //Verify token

  const secretKey = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
