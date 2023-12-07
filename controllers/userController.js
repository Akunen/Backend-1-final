const bcrypt = require('bcryptjs');
const User = require('../db/models/User');
const { createToken } = require('../auth/createToken');

const userController = {
  // POST http://localhost:3000/users/register
  register: async (req, res) => {
    try {
      const { username, password, isadmin } = req.body;

      const hashedPassword = bcrypt.hashSync(password);

      const newUser = await User.create({
        username,
        password: hashedPassword,
        isadmin,
      });

      const token = createToken(newUser);

      res.json({
        success: true,
        message: 'Tässä on valmis Token!',
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: 'Käyttäjän rekisteröinti epäonnistui.' });
      console.log(error);
    }
  },

  // POST http://localhost:3000/users/login
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({ message: 'Käyttäjää ei löytynyt.' });
      }

      const correctPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!correctPassword) {
        return res.status(401).json({ message: 'Väärä salasana.' });
      }

      const token = createToken(user);

      res.json({
        success: true,
        message: 'Tässä on valmis Token!',
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Kirjautuminen epäonnistui.' });
    }
  },
};

module.exports = userController;
