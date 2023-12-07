const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
//Ilmeisesti ei väliä käyetäänko dotenvia dbconnectionissa vai app.js:ssä
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error: ' + err);
  });

//exportataan yhteys
module.exports = mongoose.connection;
