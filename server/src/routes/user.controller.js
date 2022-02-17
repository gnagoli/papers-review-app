const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const { use } = require("./user.routes");

/**
 * Handle user registration request
 * @param {*} req
 * @param {*} res
 */
async function registerHandler(req, res) {
  const { firstName, lastName, email, password } = req.body;

  // Validate user input
  if (!(email && password && firstName && lastName)) {
    res.status(400).send("All input is required");
  }

  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: encryptedPassword,
  });
  // Create token
  const token = getJwt(user._id, email);
  user.token = token;

  return res.status(201).send({ firstName, lastName, email, token });
}
/**
 * Handle login request
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function loginHandler(req, res) {
  // Get user input
  const { email, password } = req.body;

  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  // Validate if user exist in our database
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = getJwt(user._id, email);

    // save user token
    user.token = token;
    const { firstName, lastName } = {
      firstName: user.first_name,
      lastName: user.last_name,
    };
    // user
    return res.status(200).json({ firstName, lastName, email, token });
  }
  return res.status(401).send("Invalid Credentials");
  // Our login logic ends here
}

function getJwt(id, email) {
  return jwt.sign({ user_id: id, email }, process.env.TOKEN_KEY, {
    expiresIn: "5h",
  });
}

module.exports = { registerHandler, loginHandler };
