const jwt = require('jsonwebtoken');
const user = require("../models/users")

const crypto = require('crypto');
crypto.randomBytes(20, (err, randy) => {
    if (err) {
      console.log(err);
    } else {
      console.log(randy.toString("hex"));
}
})
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_SECRET)
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
module.exports = verifyToken;