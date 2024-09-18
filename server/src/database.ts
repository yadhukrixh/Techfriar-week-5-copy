import mongoose from "mongoose";

const connectToDatabase = async () =>{
    try{
        const mongoUrl = process.env.MONGO_URL;
        await mongoose.connect(mongoUrl!);
          console.log("Mongo Db connected successfully");
    }
    catch(error){
        console.error("Database connection failed",error);
        
    }
};

export default connectToDatabase;