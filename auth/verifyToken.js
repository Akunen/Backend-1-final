// Tokenin verifikointi
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.json({
      success: false,
      message: 'Tokenia ei ole.',
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Virheellinen tai expiroitunut token.',
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
