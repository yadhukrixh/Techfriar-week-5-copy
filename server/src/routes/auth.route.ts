import express, { Request, Response } from 'express';
import passport from 'passport';
import { confirmBooking, fetchTickets, fetchUserDetails, handleAdminLogin, razorpayOrder, sendOtp, validateOtp } from '../controllers/auth.contollers';


const router = express.Router();

// Google OAuth route
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req: Request, res: Response) => {
        const user = req.user as { token: string }; // Type assertion for req.user

        if (user && user.token) {
            // Redirect back to the frontend with the token in the URL as a query parameter
            res.redirect(`http://localhost:3000?token=${user.token}`);
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    }
);



router.post('/fetchUserDetails',fetchUserDetails);

router.post('/sendOtp',sendOtp);

router.post('/validateOtp',validateOtp);

router.post('/razorpayOrder',razorpayOrder);

router.post('/confirmBooking',confirmBooking);

router.post('/fetchTickets',fetchTickets)

router.post('/handleAdminLogin',handleAdminLogin);

export default router;
