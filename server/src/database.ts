import mongoose from "mongoose";

// Function to establish a connection to the MongoDB database
const connectToDatabase = async () => {
    try {
        // Retrieve the MongoDB connection URL from environment variables
        const mongoUrl = process.env.MONGO_URL;
        
        // Establish a connection to the MongoDB database
        await mongoose.connect(mongoUrl!);
        
        // Log a success message if the connection is established
        console.log("Mongo Db connected successfully");
    } catch (error) {
        // Log an error message if the connection fails
        console.error("Database connection failed", error);
        
    }
};

// Export the connectToDatabase function as the default export
export default connectToDatabase;