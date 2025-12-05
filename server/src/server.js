// src/server.js
const app = require('./app'); // import app from same folder
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
