/**
 * JWT Verify Token
 */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyBearerToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    
    const decoded = jwt.verify(bearerToken, process.env.JWT_TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

module.exports = verifyBearerToken;
