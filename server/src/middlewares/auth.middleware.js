const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const config = process.env;

function verifyToken(req, res, next) {
  let token =
    req.body.token ||
    req.query.token ||
    req.query.access_token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"] ||
    req.headers["Authorization"];

  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }

  if (token.startsWith("Bearer")) {
    token = token.split("Bearer")[1];
  }
  token = token.trim();

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ mesage: "Invalid Token" });
  }
  return next();
}

async function admin(req, res, next) {
  if (!req.user) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }

  const user = await User.findById(req.user.user_id);
console.log(user);
  const role = user.role;
  if (role !== "ADMIN") {
    return res
      .status(403)
      .send({ message: "You are not allowed to access this resource" });
  }

  console.log(req.user);
  next();
}

module.exports = { verifyToken, admin };
