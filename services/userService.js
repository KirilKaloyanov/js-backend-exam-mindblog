const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "a45oncuv9pje";

// LOGIN     TODO: check what fields are used for identification by assignment
async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid email or password.");

  const hasMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!hasMatch) throw new Error("Invalid email or password.");

  return createSession(user);
}

// REGISTER   TODO: check what fields are used for identification by assignment
async function register(username, email, password) {
  const existing = await User.findOne({ email });

  if (existing) throw new Error("Email is registered.");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    hashedPassword,
  });

  //TODO: check if after registration user needs to login or login is automatic
  return createSession(user);
}

async function getUser(ownerId) {
  try {
    return await User.findById(ownerId).lean();
  } catch (err) {
    // console.log(err);
    return null;
  }
}

function createSession({ _id, username, email }) {
  const payload = {
    _id,
    username,
    email,
  };

  return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  login,
  register,
  getUser,
  createSession,
  verifyToken,
};
