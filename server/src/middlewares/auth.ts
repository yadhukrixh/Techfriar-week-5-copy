import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware function to authenticate JWT tokens.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token is missing
  if (!token) {
    // Return a 401 response if the token is missing
    return res.status(401).json({ message: 'Access denied, token missing!' });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // Attach the decoded token data to the request object
    (req as any).user = decoded;
    // Call the next middleware function in the stack
    next();
  } catch (err) {
    // Return a 403 response if the token is invalid
    return res.status(403).json({ message: 'Invalid token!' });
  }
};

export default authenticateJWT;