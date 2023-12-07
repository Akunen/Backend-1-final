// JWT luonti 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (user) => {
  const payload = {
    username: user.username,
    admin: user.admin,
  };

  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
}


module.exports = { createToken };