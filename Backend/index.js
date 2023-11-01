const express = require('express');
const cors = require('cors');
const userRoute = require('./Routes/Routes');
const connectDB = require('./Database/db'); // Import the connectDB function

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', userRoute);

// Call the connectDB function to connect to the MongoDB database
connectDB()
  .then(() => {
    app.listen(3001, () => {
      console.log('Server is running');
    });
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error}`);
    process.exit(1);
  });
