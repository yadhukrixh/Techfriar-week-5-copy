import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './database';
import movieRoute from './routes/movie.route';
import authRoute from './routes/auth.route';
import cors from 'cors';
import passport from './middlewares/passport'
import session from 'express-session';


dotenv.config();
const port = process.env.PORT || undefined;
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend
  methods: 'GET, PUT, POST, DELETE',
  credentials: true, // Allow credentials (cookies, headers)
}));

app.use(express.json());

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

app.use(passport.initialize());
app.use(passport.session());


app.use("/movie", movieRoute);

app.use("/auth",authRoute);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Connect to the port
app.listen(port, () => {
    console.log(`Server connected to the port ${port}`);
    connectToDatabase();
});
