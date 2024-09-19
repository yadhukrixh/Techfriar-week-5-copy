// Import required modules and initialize the Express application
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './database';
import movieRoute from './routes/movie.route';
import authRoute from './routes/auth.route';
import cors from 'cors';
import passport from './middlewares/passport'
import session from 'express-session';

// Load environment variables from the .env file
dotenv.config();

// Set the port number for the server
const port = process.env.PORT || undefined;

// Create a new Express application instance
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) for the specified origin
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend
  methods: 'GET, PUT, POST, DELETE',
  credentials: true, // Allow credentials (cookies, headers)
}));

// Parse JSON data in incoming requests
app.use(express.json());

// Configure session management
app.use(
  session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false, // Avoid resaving session if unmodified
    saveUninitialized: true, // Save uninitialized sessions
    cookie: {
      maxAge: 60000, // Session expiry time in milliseconds
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      domain: 'mydomain.com',
      sameSite: 'none' // 'strict' or 'none' as needed
    },
  })
);

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Mount routes for movies and authentication
app.use("/movie", movieRoute);
app.use("/auth", authRoute);

// Define a route for the root URL
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Start the server and connect to the database
app.listen(port, () => {
  console.log(`Server connected to the port ${port}`);
  connectToDatabase();
});