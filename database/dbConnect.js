import mongoose from 'mongoose';

const connectionString = process.env.MONGO_DB_URL; // Replace with your actual connection string

// Create a single reusable connection instance
let db;

export const connectToMongoDB = async () => {
  console.log(connectionString);
  if (db) { // Check if connection already exists
    return db;
  }
  try {
    const connection = await mongoose.connect(connectionString, {
      dbName: 'colloquy',  });
    console.log('Connected to MongoDB successfully');
    db = connection;
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};
