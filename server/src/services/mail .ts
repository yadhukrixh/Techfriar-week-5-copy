import nodemailer from 'nodemailer';

/**
 * Sends an email with a one-time password (OTP) for email validation.
 * 
 * @param {string} email - The recipient's email address.
 * @param {string} otp - The one-time password to be sent.
 */
export const mailService = async (email: string, otp: string) => {
    // Create a transporter object to send emails using Gmail
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            // Use environment variables for Gmail address and password
            user: process.env.USER_EMAIL, // your Gmail address
            pass: process.env.EMAIL_PASSWORD, // your Gmail password
        },
    });

    // Define the email options
    const mailOptions = {
        // Use environment variable for the sender's email address
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Email Validation',
        // Include the OTP in the email body
        text: `Your OTP code is: ${otp}`,
    };

    try {
        // Send the email using the transporter
        await transporter.sendMail(mailOptions);
    } catch (err) {
        // Log any errors that occur during email sending
        console.error(err);
    }
}