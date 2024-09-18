import mongoose, { Schema, Document } from 'mongoose';

// 1. Define User Interface
export interface IUser extends Document {
  googleId: string;
  firstname: string;
  lastname: string;
  email: string;
  emailVerifiedAt: Date | null;
  photo?: string; // Optional field
}

// 2. Define the User Schema
const userSchema: Schema<IUser> = new mongoose.Schema({
  googleId: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerifiedAt: { type: Date, default: null },
  photo: { type: String }, // Optional field to store profile picture URL
});

// 3. Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
