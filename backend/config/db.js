// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy
// Some elements of this code are based on the MERN stack tutorial by freeCodeCamp.org on YouTube.
// This code is used to connect to a MongoDB database using Mongoose.
// It exports a function that connects to the database and logs the connection status.
// The connection string is stored in an environment variable called MONGO_URI.
// The connection is established using the mongoose.connect() method.
// If the connection is successful, it logs the host of the connected database.
// If there is an error, it logs the error message and exits the process with a failure code.

import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ MONGO_URI is undefined. Check your .env file and make sure it is loaded correctly.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};